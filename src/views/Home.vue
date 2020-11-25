<template>
  <div>
    <input class="settings_input" v-model="$root.shadowDB.Manuscript[manuscriptUUID].title" 
    @keyup="updateDatabase()"
    placeholder="Project Title"
    />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "ProjectHome",
  data(){
    return {
        manuscriptUUID : null
    }
  },
  methods:{
    updateDatabase(){
     this.$root.UpdateRecord('Manuscript', this.manuscriptUUID, this.$root.shadowDB.Manuscript[this.manuscriptUUID])
    }
  },
  beforeMount(){
    if(!Object.keys(this.$root.shadowDB.Manuscript).length){
      // No manuscript so create
        let newObj ={}
      newObj.uuid = this.$root.uuid.v1();
      newObj.title =""
      newObj.files = []
      this.manuscriptUUID=newObj.uuid
    
    /*this.$root.shadowDB.Manuscript[newObj.uuid]=newObj
      console.log(this.$root.shadowDB)
      console.log(this.$root.shadowDB.Manuscript)
      */

this.$set(this.$root.shadowDB.Manuscript,newObj.uuid , newObj)   // REMEMBER needs to be REACTIVE 

      this.$root.AddRecord('Manuscript', newObj )
       
    }else{
      this.manuscriptUUID=Object.keys(this.$root.shadowDB.Manuscript)[0]
    }
  }
};
</script>

<style scoped>

</style>