<template lang="pug">
    div        
        .nav-wrapper.sidebar
            ul
                li
                    router-link(:to="{path: '/admin/profile'}")
                        | Profile
                li
                    router-link(:to="{path: '/admin/news'}")
                        | News list
                li
                    router-link(:to="{path: '/admin/categories'}")
                        | Categories
                li
                router-link(:to="{path: '/chat'}")
                        | Chat
                li
                    span( class="link" @click.prevent="logOut")
                        | Log out
        router-view
</template>
<script>
import PostsService from '@/services/PostsService'

export default {
  name: 'LoggedHeader',
  methods: {
        async logOut() { 
            await PostsService.logOut()
            this.$router.push({ name: 'Posts' })
        }
  }
}
</script>
<style lang="scss">
.link {
    cursor: pointer;
    color: #039be5;
    &:hover {
        color: #0056b3;
        text-decoration: underline;
    }
}
.sidebar {
    left: 0;
    top: 0;
    position: absolute;
    display: flex;
    flex-flow: column;
    max-width: 200px;
    background-color: #ee6e73;
    padding: 0 15px;
    text-align: left;
    z-index: 1;
    ul {
        margin: 0;
    }
}
</style>

