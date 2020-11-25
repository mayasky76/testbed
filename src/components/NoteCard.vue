<template>
    <div class="card">
{{cardId}}
    </div>
</template>
<style scoped>
.card{
    padding:10px;
}
</style>

<script>
export default {
  props: {
       cardId: {
      required: true,
      type: String
    }
}
}
</script>
