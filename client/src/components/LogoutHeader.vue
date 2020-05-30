<template lang="pug">
    nav
        .nav-wrapper.blue
            router-link(:to="{path: '/'}" class="brand-logo")
                | Home
            ul#nav-mobile.right
                li
                    router-link(:to="{path: '/login'}")
                        | Login/Register
                li
                    router-link(:to="{path: '/posts'}")
                        | News
</template>
<script>
export default {
  name: 'LogoutHeader'
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

