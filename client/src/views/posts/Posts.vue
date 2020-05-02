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
              th Categories
            tr( v-for="(post, index) in posts", :key="post.title" )
              td {{ index }}
              td
                router-link(:to="{name: 'SinglePost', params:{id: post._id }}")
                  | {{ post.title }}                 
              td {{ post.description }}
              td 
                button(class="btn pt-0" @click="deletePosts(index)") 
                  <x-circle-icon size="2x" class="circle-icon"></x-circle-icon> 
              td
                router-link(class="btn" :to="{name: 'UpdatePost', params:{id: post._id }}")
                  | <edit-2-icon size="1.5x" class="edit-icon pt-0"></edit-2-icon>
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
  import { XCircleIcon, Edit2Icon } from 'vue-feather-icons'
  import PostsService from '@/services/PostsService'
  export default {
    name: 'PostsPage',
    components: {
      XCircleIcon, Edit2Icon
    },
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
    },
    mounted () {
      this.getPosts()
      //this.fetchCategories()
    }
  }
</script>

<style lang="scss" scoped>
  .delete {
    background: red;
  }
  
  .circle-icon {
    &:hover {
      circle {
        fill: #c82333;
      }
    }
    color: white;
    circle {
      fill: #dc3545;
    }
    line {
      color: white;
    }
  }
  .edit-icon {
    color: #007bff;
  }
</style>