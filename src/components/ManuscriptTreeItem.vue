<template>
  <draggable
    v-bind="dragOptions"
    tag="div"
    :list="files"
    :delay="200"
    :delayOnTouchOnly="true"
    @change="emitter"
  > 

 
   <div class="side-menu-item" :key="el.uuid" v-for="(el,index) in files">

      <div class="listitem" :class="{highlight : (el.uuid === $root.interface.SelectedNode.uuid)}">
        <div class="file-icon"   v-if="el.icon==='folder' && !el.open" @click="el.open= !el.open">
          <i class="mdi mdi-folder"></i>
        </div>

        <div class="file-icon" v-if="el.icon==='folder' && el.open" @click="el.open= !el.open">
             <i class="mdi mdi-folder-outline"></i>
        </div>

        <div class="file-icon"  v-if="el.icon==='file'">
            <i class="mdi mdi-menu"></i>
        </div>


        <div class="file-title" @click="itemclick(el, index)">
              <ManuscriptNode :el="el" />   
          </div>
        <div v-if="el.hidden">
          <div>check_box</div>
        </div>
      </div>

      <div v-if="el.open">
       <ManuscriptTreeItem :files="el.files" @input="emitter" class="subfolder"/>
      </div>
    </div>

     
  </draggable>
</template>

<style scoped>
.file-icon{
  position: absolute;
  top:0px;
  left:0px;
  width:30px;
}
.file-title{
  margin-left: 30px;
}

.side-menu-item{
    position: relative;
  width:100%;
  display: block;

}
.highlight{
  background-color: violet;
}

.subfolder {
  padding-left: 10px;
}
.subfolder:empty {
  padding: 5px;
  text-align: left;
  font-size: 0.5rem;
  
}
.subfolder:empty::after {
  padding-left: 10%;
  content: "empty .... ";
}
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}
.listitem{


  cursor: pointer;
}
.ghost {
  opacity: 0.5;
}
</style>

<script>
import draggable from "vuedraggable";
import ManuscriptNode from "./ManuscriptNode";
export default {
  name: "ManuscriptTreeItem",
  methods: {
    emitter(value) {
      console.log("emit")
      this.$emit("input", value);
    },
    itemclick(el, index) {
      el.index = index;
      // set it in the root variable - not using vuex I think!
     this.$root.interface.SelectedNode = el;
  //    this.$root.SaveManuscriptData();
    }
  },
  components: {
    draggable,
    ManuscriptNode
  },
  data() {
    return {
      drag: null,
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  props: {
       files: {
      required: true,
      type: Array
    }
  }
};
</script>