<template lang="pug">
    nav
        .nav-wrapper.blue
            router-link(:to="{path: '/'}" class="brand-logo")
                | Home
            ul#nav-mobile.right
                li
                    router-link(:to="{path: '/admin'}")
                        | Admin
                li
                    router-link(:to="{path: '/login'}")
                        | Login/Register
                li
                    router-link(:to="{path: '/posts'}")
                        | News
                li
                    router-link(:to="{path: '/categories'}")
                        | Categories
</template>
<script>
export default {
  name: 'Header',
  mounted() {
      console.log(this.$isAuth);
      
  },
  computed: {
      isLoged: function(){
          console.log(this.$isAuth);
          
        return this.$isAuth
      },
  }
}
</script>
<style lang="scss">
nav {
  .brand-logo {
    left: 20px !important;
    transform: none !important;
  }
}
</style>

