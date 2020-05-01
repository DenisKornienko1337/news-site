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
              th Posts
            tr( v-for="(post, index) in posts", :key="post.title" )
              td {{ index }}
              td {{ post.title }}
              td {{ post.description }}
              td 
                button(class="btn btn-danger" @click="deleteOnConfirm(index)") Delete
              td
                router-link(:to="{name: 'UpdatePost', params:{id: post._id, post }}")
                  | Update
              td
                div(v-for="(category, index) in post.categories.items", :key="category.categoryId.title")
                  span {{category.categoryId.title}}



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
        deletedId: false,
        categories: [{
          title: '',
        }],
      }
    },
    methods: {
      async fetchCategories () {
        const response = await PostsService.fetchCategories()
        this.categories = response.data.categories
      },
      async getPosts () {
        const response = await PostsService.fetchPosts()
        this.posts = response.data.posts
      },
      async deletePosts (index) {
        this.$dialog.confirm('Please confirm to continue')
        .then(function () {
          console.log('Clicked on proceed')
        })
        const deletedItem = this.posts[index]
        this.posts.splice(index,1)
        this.$notify({
          group: 'notifications',
          title: 'User notification',
          text: 'Post have been deleted!',
          type: 'error'
        }); 
        await PostsService.deletePosts({
            id: deletedItem._id
        })
      },
      deleteOnConfirm(index) {
        let self = this
        this.$dialog.confirm('Please confirm to continue')
        .then(function(){
          self.deletePosts(index)
        })
      },
    },
    mounted () {
      this.getPosts()
    }
  }
</script>

<style lang="scss" scoped>
  .delete {
    background: red;
  }
</style>