
<template lang="pug">
  .container
    .row
      .col-md-9
        h1
          span(v-if="isAdd") Add News
          span(v-else) Update News
        form
          .form-group
            input.form-control( type="hidden", name="id", id="id", placeholder="Id", v-model.trim="postItem._id" )
          .form-group
            input.form-control( type="text", name="title", id="title", placeholder="Title", v-model.trim="postItem.title" )
            .validation-error(v-if="!validTitle") This filed cannot be empty!
          .form-group 
            textarea.form-control( type="text", rows="10", name="description", id="description", placeholder="Content", v-model.trim="postItem.description" )
            .validation-error(v-if="!validDescription") This filed cannot be empty!
          .form-group.text-left.action-buttons
            button.btn.btn-primary.blue( v-if="isAdd" type="button", name="updatePost", id="updatePost", @click="addPost()" )
              | add news
            button.btn.btn-primary.blue( v-if="!isAdd" type="button", name="updatePost", id="updatePost", @click="updatePost()" )
              | update news
            button.btn.btn-success.blue( type="button", @click="goBack()" )
              | go to news page
      .col-md-3
        .sidebar-right
          h3 Categories
          label(v-for="(category, index) in categories", :key="category.title")
            input(type="checkbox" v-model="category.value")
            span
            | {{category.title}}
          .validation-error(v-if="!validCat") This filed cannot be empty!
      
</template>

<script>
  // import PostsService from '@/services/PostsService'
  import {mapActions} from 'vuex'

  export default {
    name: 'UpdatePost',
    data () {
      return {
        validTitle: true,
        validDescription: true,
        validCat: true,
      }
    },
    methods: {
      ...mapActions(['fetchCategories','fetchPosts','createPost', 'updateSinglePost']),
      addPost () {
        // search selected categories
        const selectedCategories = this.categories.filter(c => c.value)
        // End search selected categories
        if (this.postItem.title !== '' && this.postItem.description !== '' && selectedCategories.length) {
          const selectedIDS = selectedCategories.map(c => {
            return {
              _id: c._id,
              title: c.title
            } 
          })
          // add Post
          const post = {
            title: this.postItem.title,
            description: this.postItem.description,
            categories: selectedIDS
          }
          this.createPost(post).then(() => {
            // use notification
            this.$helper.notify('Notification', 'Post have been added!', 'success')
            // redirect
            this.$router.push({ name: 'Posts' })
          } )
        } else {
          // validate
          this.postItem.title=='' ? this.validTitle = false : this.validTitle = true
          this.postItem.description=='' ? this.validDescription = false : this.validDescription = true
          selectedCategories.length ? this.validCat = true : this.validCat = false
        }
      },
      updatePost () {
        // search selected categories
        const selectedCats = this.categories.filter(c => c.value)
        if (this.postItem.title !== '' && this.postItem.description !== '' && selectedCats.length) {
          const selectedIDS = selectedCats.map(c => {
            return {
              _id: c._id,
              title: c.title
            } 
          })          
          // update Post
          const post = {
            _id: this.postItem._id,
            title: this.postItem.title,
            description: this.postItem.description,
            categories: selectedIDS
          }
          this.updateSinglePost(post).then(() => {
            // use notification
            this.$helper.notify('Notification', 'Post have been updated!', 'warn')
            // redirect
            this.$router.push({ name: 'Posts' }) 
          })             
          // this.$forceUpdate();      
        } else {
          // validate
          this.postItem.title=='' ? this.validTitle = false : this.validTitle = true
          this.postItem.description=='' ? this.validDescription = false : this.validDescription = true
          selectedCats.length ? this.validCat = true : this.validCat = false
        }
      },
      goBack () {
        this.$router.go({ name: 'Posts' })
      }
    },
    mounted () {
      // get Categories
      this.fetchCategories()
      this.fetchPosts()
    },
    computed: {
      isAdd: function(){
        if(this.$attrs.id) return false;
        return true
      },
      categories: function(){
        if (this.$store.state.category.categories){          
          if(this.postItem.categories){            
            this.postItem.categories.items.map(postCat => {
              this.$store.state.category.categories.map(c => {
                if(postCat.categoryId._id === c._id) {
                  c.value = true
                }
              })
            })
          }
          return this.$store.state.category.categories;
        }
        return []
      },
      postItem: function(){
        const posts = this.$store.state.post.posts;

        if(posts.length && this.$attrs.id){
          const findPostItem = posts.find(p => p._id === this.$attrs.id)
          return findPostItem;
        } 
        return {
          id: '',
          title: '',
          description: '',
          categories: {
            items: []
          }
        }
      }
    }
  }
</script>
<style lang="scss">
  .sidebar-right {
    padding-left: 30px;
    margin-top: 70px;
    label {
      text-align: left;
      display: block !important;
    }
  }
  .action-buttons {
    button {
      margin-top: 20px !important;
      width: 200px;
      margin-left: 20px !important;
      display: inline-block;
    }
  }
  .container {
    max-width: 80%;
  }
</style>