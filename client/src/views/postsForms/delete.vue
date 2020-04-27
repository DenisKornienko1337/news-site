<template lang="pug">
    form(@submit.prevent="deletePosts")
        input( type="hidden" name="id" :value="postItem._id")
        input(type="submit" value="Delete post")
</template>

<script>
  import PostsService from '@/services/PostsService'
  export default {
    name: 'postDelete',
    props: ['post'],
    data () {
      return {
        postItem: this.post,
      }
    },
    methods: {
      async deletePosts () {
        await PostsService.deletePosts({
            id: this.post._id
        })
        this.$router.go()
      }
    }
  }
</script>