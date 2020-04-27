<template lang="pug">
  .container
    .row
      .col-lg-12
        h1
          | News
        h3
          | This file will list all the news

        section.panel.panel-success( v-if="posts.length" )
          .panel-heading
            | list of news
          table.table.table-striped
            tr
              th Title
              th Content
            tr( v-for="(post, index) in posts", :key="post.title" )
              td {{ post.title }}
              td {{ post.description }}

        section.panel.panel-danger( v-if="!posts.length" )
          p
            | There are no news ... Lets add one now!
          div
            router-link( :to="{ name: 'NewPost' }" )
              | add news
</template>

<script>
  import PostsService from '@/services/PostsService'
  export default {
    name: 'PostsPage',
    data () {
      return {
        posts: []
      }
    },
    methods: {
      async getPosts () {
        const response = await PostsService.fetchPosts()
        this.posts = response.data.posts
      }
    },
    mounted () {
      this.getPosts()
    }
  }
</script>