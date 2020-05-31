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
              th Index
              th Title
              th Content
              th Buttons
              th Update
            tr( v-for="(post, index) in posts", :key="post.title" )
              td {{ index }}
              td {{ post.title }}
              td {{ post.description }}
              td 
                button( class="btn btn-danger" @click="deletePosts(index)") Delete
              td
                router-link(:to="{name: 'UpdatePost', params:{id: post._id, post }}")
                  | Update
        section.panel.panel-danger( v-if="!posts.length" )
          p
            | There are no news ... Lets add one now!
          div
            router-link( :to="{ name: 'NewPost'}" )
              | add news
        div
            router-link( :to="{ name: 'NewPost' }" )
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
      async getPosts () {
        const response = await PostsService.fetchPosts()
        this.posts = response.data.posts
      },
      async deletePosts (index) {
        const deletedItem = this.posts[index]
        
        // this.posts.splice(index,1)   

        await PostsService.deletePosts({
            id: deletedItem._id
        })          
      }
      // deletePosts(index) {   
      // }
    },
    mounted () {
      this.getPosts()
    }
  }
</script>