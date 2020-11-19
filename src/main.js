import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import db from "./DexieDB";
import { uuid } from 'vue-uuid';
// Iian
Vue.config.productionTip = false

new Vue({
  uuid,
  router,
  data() {
    return {
      db,
      uuid,
      dbloaded: false,
      shadowDB: {},
      windowID: null
    }
  },
  methods: {
    AddRecord(myTable, myData) {
      myData.uuid = this.$root.uuid.v1();
      myData.lastupdated = Date.now();
      this.$root.db.transaction('rw', myTable, tx => {
        tx.source = this.windowID
        this.db[myTable].add(myData);
      })
    },
    UpdateRecord(myTable, myKey, myData) {
      myData.uuid = myKey;
      myData.lastupdated = Date.now();

      this.$root.db.transaction('rw', myTable, tx => {
        tx.source = this.windowID
        this.$root.db[myTable].put(myData)
      })


      //    
    },
    DeleteRecord(myTable, myKey) {
      this.$root.db.transaction('rw', myTable, tx => {
        tx.source = this.windowID
        this.$root.db[myTable].delete(myKey)
      })


    }
  },

  beforeMount() {

    this.windowID = this.$root.uuid.v1()
    /*
    The Shadow DB is a Reactive Object copy of the database
    You do not WRITE to the shadowDB you write to the database and it will emit changes to all windows
    This bit here simply constructs the shadowDB object from the database
    */
    let dbcounter = 0
    let dblimit = 0
    this.db.tables.forEach((table) => {

      if (table.name.charAt(0) != "_") {  // avoid the system tables
        dblimit++
        this.$set(this.shadowDB, table.name, {})    // can't just ASSIGN as it wont be reactibe so set it using VUE 
        this.db[table.name].each((r) => {
          this.$set(this.shadowDB[table.name], r.uuid, r)     // can't just ASSIGN as it wont be reactibe so set it using VUE
          console.log(r)
        }).then(() => {
          dbcounter++
          if (dbcounter === dblimit) {
            this.dbloaded = true
            console.log("done", dblimit)
          } else { console.log("waiting", dblimit) }
        })
      }
    })

  },
  mounted() {
    this.$root.db.on("changes", (changes) => {
      changes.forEach((change) => {
        if (change.source != this.windowID) { // using transactions allows me to filter updates out of the window that sent them (just causes lag occasionanly)
          switch (change.type) {
            case 1: // CREATED
              this.$set(this.shadowDB[change.table], change.key, change.obj)   // can't just ASSIGN as it wont be reactive so set it using VUE
              break;
            case 2: // UPDATED
              this.$root.shadowDB[change.table][change.key] = change.obj
              break;
            case 3: // DELETED
              delete this.$root.shadowDB[change.table][change.key]
              break;
          }
        } else {
          console.log("my window so skipped")
        }
      })
    })
  },
  render: h => h(App)
}).$mount('#app')
