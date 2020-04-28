<template lang="pug">
  .container
    .row
      .col-lg-12
        h1
          | Categories
        h3
          | This file will list all the news

        section.panel.panel-success( v-if="posts.length" )
          .panel-heading
            | list of categories
          table.table.table-striped
            tr
              th Index
              th Title
            tr( v-for="(post, index) in posts", :key="post.title" )
              td {{ index }}
              td {{ post.title }}
        section.panel.panel-danger( v-if="!posts.length" )
          p
            | There are no news ... Lets add one now!
          div
            router-link( :to="{ name: 'AddCategory'}" )
              | add news
        div
            router-link( :to="{ name: 'AddCategory' }" )
              | add  news
</template>

<script>
  import PostsService from '@/services/PostsService'
  export default {
    name: 'PostsPage',
    data () {
      return {
        posts: [],
        deletedId: false
      }
    },
    methods: {
      async fetchCategories () {
        const response = await PostsService.fetchCategories()
        this.posts = response.data.posts
      },
    },
    mounted () {
      this.fetchCategories()
    }
  }
</script>