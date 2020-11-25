<template>
   <div class="rhside-tool-panel" :class="{'notesPanel': $root.interface.notesPanel}" v-if="$root.interface.SelectedNode.icon==='file'" >
       <button class="panelBtn" @click="$root.interface.notesPanel=!$root.interface.notesPanel"><i class="mdi mdi-folder"></i></button>
   <div class="sticky">
<button @click="addCard()">Add Note</button>
   </div>

   <div v-for="(note,index) in $root.interface.SelectedNode.notes" :key="index">
    <NoteCard :cardId="note.uuid" />
       </div>

   </div>
</template>
<script>
import NoteCard from "./NoteCard";
export default {
    components: {
        NoteCard
    },
    methods:{
        addCard(){
       console.log(this.$root.interface.SelectedNode)
        let uuid = this.$root.uuid.v1();
     let newCard={
          uuid : uuid
      }
    this.$root.AddRecord("Cards", newCard)
    this.$set(this.$root.shadowDB.Cards,uuid , newCard)  // add a reactive element
    this.$root.interface.SelectedNode.notes.push(newCard)
//Save the Change
    this.$root.UpdateRecord('Manuscript', Object.keys(this.$root.shadowDB.Manuscript)[0], this.$root.shadowDB.Manuscript[Object.keys(this.$root.shadowDB.Manuscript)[0]])
        }
    }
};
</script>


<style scoped>
.sticky {
  position: sticky;
  top: 0px;
  z-index: 1;
  height:48px;
  padding:0px;
}
.panelBtn{
    position: absolute;
    top:0px;
    left:-40px;
    right:0px;
    width:40px;
    height: 40px;
    margin:0px;
    border-radius: 10px 0 0 10px;
    padding:5px;
    background-color: var(--interface-button-background);
    color: var(--interface-button-foreground);
}
.panelBtn:hover,.panelBtn:active,.panelBtn:focus{
     background-color: var(--interface-button-background-hover);
    color: var(--interface-button-foreground-hover);
    outline:none;
}

.notesPanel{
    right:0px;
     }

</style>