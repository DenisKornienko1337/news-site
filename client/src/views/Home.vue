<template lang="pug">
  .home
    h2 About
    | Some about text
    .sitemap
      h2 Sitemap
      ul
        li     
          router-link(:to="{path: '/'}")
            | Home
        li
          router-link(:to="{path: '/posts'}")
            | Posts
        li
          router-link(:to="{path: '/categories'}")
            | Categories
    .developers
      h2 Developers

</template>

<script>

export default {
  name: 'Home',
}
</script>

<style lang="scss">
    li {
      list-style-type: none;
      display: block;
    }
</style>
