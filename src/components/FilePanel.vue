<template>
   <div class="side-tool-panel" :class="{'showPanel': $root.interface.showPanel}">
       <button class="panelBtn" @click="$root.interface.showPanel=!$root.interface.showPanel"><i class="mdi mdi-folder"></i></button>
   <div class="sticky">
       <button class="fab"  @click="AddManuscriptTreeItem('folder')" ><i class="mdi mdi-folder-plus"></i></button>
        <button class="fab"  @click="AddManuscriptTreeItem('file')"><i class="mdi mdi-playlist-plus"></i></button>
         <button class="fab"  @click="popinfo()"><i class="mdi mdi-playlist-plus"></i></button>
   </div>
   <ManuscriptTreeItem
      :files="$root.shadowDB.Manuscript[Object.keys(this.$root.shadowDB.Manuscript)[0]].files"
      @input="ChangeDetected"
    />
   </div>
</template>
<script>
import ManuscriptTreeItem from "./ManuscriptTreeItem";
export default {
  components: {
    ManuscriptTreeItem
  },
  methods: {
      popinfo(){
          console.log(this.$root.shadowDB)
      },
    ChangeDetected() {
  this.$root.UpdateRecord('Manuscript', Object.keys(this.$root.shadowDB.Manuscript)[0], this.$root.shadowDB.Manuscript[Object.keys(this.$root.shadowDB.Manuscript)[0]])
  
    },
    FindNodeByID: function(uuid, parentObj) {
            let el = false
            let arrtosearch = parentObj.files
            arrtosearch.some((element, index) => {
                if (element.uuid === uuid) {
                    el = {}
                    el.parentObj = parentObj
                    el.index = index
                    return true
                } else {
                    if (element.files && !el) {
                        el = this.FindNodeByID(uuid, element)
                    }
                }
            });
            return el
        },
    AddManuscriptTreeItem(payload) {
console.log(payload)
let uuid = this.$root.uuid.v1();
      let newObj = {
        uuid: uuid,
        icon: payload,
      };
      if (payload === "folder") {
          newObj.title='',
        newObj.open = true;
        newObj.files = [];
       
      }else{
      newObj.notes = [];
      let newCard={
          uuid : uuid
      }
      
      this.$root.AddRecord("Cards", newCard) // create card in DB
      this.$set(this.$root.shadowDB.Cards,uuid , newCard)  // add a reactive element

           }

      if (this.$root.interface.SelectedNode.uuid) {
        if (this.$root.interface.SelectedNode.icon === "folder") {
          this.$root.interface.SelectedNode.open = true;
          this.$root.interface.SelectedNode.files.push(newObj);
        } else {
          let pos = this.FindNodeByID(
            this.$root.interface.SelectedNode.uuid,
            this.$root.shadowDB.Manuscript[Object.keys(this.$root.shadowDB.Manuscript)[0]]
          );
         pos.parentObj.files.splice(pos.index + 1, 0, newObj);
        }
      } else {
        this.$root.shadowDB.Manuscript[Object.keys(this.$root.shadowDB.Manuscript)[0]].files.push(newObj);
      }
      // item Added so SAVE the project Info
 // this.$root.SaveManuscriptData();

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

.showPanel{
    left:0px;
     }

</style>