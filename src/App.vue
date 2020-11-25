<template>
  <div id="app">
    <div v-if="$root.dbloaded">
      <div id="appContent">
        <router-view />
      </div>
      <MainNavigation />
    </div>
    <div v-if="!$root.dbloaded">Loading the database</div>
  </div>
</template>

<script>
import MainNavigation from '@/components/MainNavigation'

export default {
  components:{
    MainNavigation
  }
}
</script>

<style >
#app {
  overflow: hidden;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
   background-color:var(--main-background);
   color:var(--main-foreground);
}
#appContent {
  overflow: hidden;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  padding: 0px;
}

@media (min-width: 576px) {
}

@media (min-width: 768px) {
  #appContent {
    left: 50px;
  }
  }

@media (min-width: 992px) {
}

@media (min-width: 1200px) {
}
</style>