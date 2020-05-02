<template lang="pug">
  #app
    Header(test="title")
    router-view
    notifications(group="notification")
</template>
<script>
import Header from '@/components/Header'
export default {
  components: {Header}
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  table {
    margin-top: 30px;
  }
}
</style>

