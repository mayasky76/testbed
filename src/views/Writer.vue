<template>
  <div>
    <FilePanel/>
    <FileInfo />
    <NotesPanel />
  </div>
</template>

<script>
// @ is an alias to /src
import FilePanel from "@/components/FilePanel"
import NotesPanel from "@/components/NotesPanel"
import FileInfo from "@/components/FileInfo"
export default {
  name: "Writer",
  components:{
    FilePanel,
    FileInfo,
    NotesPanel
  },
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
      newObj.title ="New Project"
      this.manuscriptUUID=newObj.uuid
      this.$root.shadowDB.Manuscript[newObj.uuid]=newObj
      this.$root.AddRecord('Manuscript', newObj )
    }else{
      this.manuscriptUUID=Object.keys(this.$root.shadowDB.Manuscript)[0]
    }
  }
};
</script>

