<template>
   <div class="panelBody" :class="[{'showPanel': $root.interface.showPanel},{'notesPanel': $root.interface.notesPanel}]" > 
  <div v-if="$root.interface.SelectedNode.icon==='folder'">
    <h1>folder</h1>
         <input class="settings_input" v-model="$root.interface.SelectedNode.title" 
    @keyup="updateFolder()"
    placeholder="Title"
    />
  </div>
  <div  v-if="$root.interface.SelectedNode.icon==='file'">
    <h1>file</h1>
    <input class="settings_input" v-model="$root.shadowDB.Cards[$root.interface.SelectedNode.uuid].title" 
    @keyup="updateFile()"
    placeholder="Title"
    />

<textarea class="settings_input" v-model="$root.shadowDB.Cards[$root.interface.SelectedNode.uuid].content"  @keyup="updateFile()"></textarea>

  </div>
   </div>
</template>

<script>
export default {
    methods:{
        updateFolder(){
             this.$root.UpdateRecord('Manuscript', Object.keys(this.$root.shadowDB.Manuscript)[0], this.$root.shadowDB.Manuscript[Object.keys(this.$root.shadowDB.Manuscript)[0]]) 
        },
        updateFile(){
             this.$root.UpdateRecord('Cards', this.$root.interface.SelectedNode.uuid, this.$root.shadowDB.Cards[this.$root.interface.SelectedNode.uuid]) 
        }
    }
}
</script>
<style scoped>
.panelBtn{
    position: absolute;
    top:0px;
    right:-40px;
    width:40px;
    height: 40px;
    margin:0px;
    border-radius: 0 10px 10px 0;
    padding:5px;
    background-color: var(--interface-button-background);
    color: var(--interface-button-foreground);
}
.panelBtn:hover,.panelBtn:active,.panelBtn:focus{
       background-color: var(--interface-button-background-hover);
    color: var(--interface-button-foreground-hover);
    outline:none;
}
.panelBody{
    position: absolute;
    top:0px;
    left:40px;
    right:0px;
    bottom:0px

}
.showPanel{
    left:340px;
     }

     .notesPanel{
         right:340px;
     }


</style>