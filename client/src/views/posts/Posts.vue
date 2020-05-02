<template lang="pug">
  .container
    .row
      .col-lg-12
        h1
          | News
        section.panel.panel-success( v-if="posts.length" )
          AddButton(text="Add News" path="NewPost")
          select.browser-default(@change="filterPosts($event)")
            option(value="-1") All
            option(v-for="(category) in categories" :key="category.title") {{category.title}}
          input(@input="searchPosts($event)")
          table.table.table-striped
            tr
              th Index
              th Title
              th Content
              th Buttons
              th Update
              th Categories
            tr(v-for="(post, index) in posts", :key="post.title" v-show="!post.catHide && !post.queryHide")
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
        div.input-field
        section.panel.panel-danger( v-if="!posts.length" )
          p
            | There are no news ... Lets add one now!
</template>

<script>
  import { XCircleIcon, Edit2Icon } from 'vue-feather-icons'
  import PostsService from '@/services/PostsService'
  import AddButton from '@/components/AddButton'

  export default {
    name: 'PostsPage',
    components: {
      XCircleIcon, Edit2Icon, AddButton
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
      searchPosts(event) {
        let searchQuery = event.target.value
        for(let i in this.posts) {
          if(this.posts[i].title.toLowerCase().includes(searchQuery.toLowerCase())) {
            this.posts[i].queryHide = false
          } else {
            this.posts[i].queryHide = true
          }
        }
        this.$forceUpdate();
      },
      filterPosts(event) {
        let selectedCategoryTitle = event.target.value
        for(let i in this.posts) {
          if(selectedCategoryTitle==-1) {
            this.posts[i].catHide = false
          } else {
            let flag = this.isInCategories(this.posts[i].categories.items, selectedCategoryTitle)
            this.posts[i].catHide = flag
          }
        }
        this.$forceUpdate();
      },
      isInCategories(cats, value){
        for(let i in cats) {
          if(cats[i].categoryId.title == value) return false
        }
        return true
      },
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
        await PostsService.deletePosts({
            id: deletedItem._id
        })
      },
    },
    mounted () {
      this.fetchCategories()
      let self = this
      setTimeout(function(){
        self.getPosts()
      }, 200)
    }
  }
</script>

<style lang="scss" scoped>
  .delete {
    background: red;
  }
  select {
    max-width: 300px;
    margin: 0 auto;
    margin-top: 30px;
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