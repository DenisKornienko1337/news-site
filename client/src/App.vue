<template lang="pug">
  #app
    Header(test="title")
    router-view
    notifications(group="notifications" position="bottom right")
</template>
<script>
import Header from '@/components/Header'
export default {
  components: {Header}
}
</script>
<style lang="scss">
body {
  font-size: 24px !important;
  font-family: 'Opens Sans', sans-serif !important;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  table {
    margin-top: 30px;
  }
  td {
  a, button {
    background-color: transparent !important;
    box-shadow: none !important;
  }
}
.dg-btn {
  background-color: blue !important;
  color: #fff !important;
}
// .row {
//   display: block !important;
// }

  @font-face {
    font-family: 'Open Sans';
    src:  url('./assets/fonts/OpenSans-Light.ttf') format('ttf');
    font-weight: 300;
  }
  @font-face {
    font-family: 'Open Sans';
    src:  url('./assets/fonts/OpenSans-Regular.ttf') format('ttf');
    font-weight: 400;
  }
  @font-face {
    font-family: 'Open Sans';
    src:  url('./assets/fonts/OpenSans-Bold.ttf') format('ttf');
    font-weight: 700;
  }
}
</style>

