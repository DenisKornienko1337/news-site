<template lang="pug">
    .container
        h2 {{ title }}
        |  {{description}}

</template>

<script>
import PostsService from '@/services/PostsService'

export default {
    name: 'SinglePost',
    data() {
        return {
            title: '',
            description: '',
            categories: []
        }
    },
    methods: {
    },
    async mounted() {      
        const response = await PostsService.getPost({
            id: this.$attrs.id
        })
        this.title = response.data.posts.title
        this.description = response.data.posts.description
        this.categories = response.data.posts.categories.items
   }
}
</script>

<style lang="scss">
  .container {
    max-width: 60%;
  }
  .articles-list {
    max-width: 600px;
    text-align: left;
  }
</style>