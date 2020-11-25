<template>
<span>
    <template v-if="el.icon==='folder'">
    <span v-if="el.title">{{el.title}}</span>
    <span v-if="!el.title"><em style="opacity:50%">untitled ....... </em></span>
    </template>
      <template v-if="el.icon==='file'">
    <span v-if="$root.shadowDB.Cards[el.uuid].title">{{$root.shadowDB.Cards[el.uuid].title}}</span>
    <span v-if="!$root.shadowDB.Cards[el.uuid].title"><em style="opacity:50%">untitled ....... </em></span>
    </template>

 

</span>
</template>
<script>
export default {
  props: {
       el: {
      required: true,
      type: Object
    }
  },

}
</script>