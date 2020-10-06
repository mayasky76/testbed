<template>
  <div class="home">
  <div  v-if="!Object.keys($root.shadowDB.Manuscript).length"  >
  <h1>Title</h1>
  <input v-model="manuscriptTitle"/>
  <div>{{errortxt}}</div>
    <button  @click="NewManuscript()">Start Writing</button>
  </div>
  <div v-else>
    <input v-model="$root.shadowDB.Manuscript[Object.keys($root.shadowDB.Manuscript)[0]].title" @keyup="$root.UpdateRecord('Manuscript', $root.shadowDB.Manuscript[Object.keys($root.shadowDB.Manuscript)[0]].uuid, $root.shadowDB.Manuscript[Object.keys($root.shadowDB.Manuscript)[0]])"/>
      <pre>
        {{$root.shadowDB}}
      </pre>

  </div>
  

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Manuscript",
  data(){
    return {
        manuscriptTitle : null,
        errortxt : null
    }
  },
  methods:{
    NewManuscript(){
      if(this.manuscriptTitle){
let newObj ={}
newObj.title = this.manuscriptTitle
           this.$root.AddRecord('Manuscript', newObj )
      }else{
        this.errortxt ="You need to enter a title"
      }
    }
  }
};
</script>
