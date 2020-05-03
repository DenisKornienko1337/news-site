
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
  import PostsService from '@/services/PostsService'

  export default {
    name: 'UpdatePost',
    data () {
      return {
        validTitle: true,
        validDescription: true,
        validCat: true,
        isAdd: true,
        postItem: {
          id: '',
          title: '',
          description: '',
        },
        categories:[],
        selectedCategories: [],
      }
    },
    methods: {
      async addPost () {
        this.selectedCategories = this.selectedCategories.filter(function(id) {
          return !!id;
        });
        const selectedCategories = this.categories.filter(c => c.value)
        if (this.postItem.title !== '' && this.postItem.description !== '' && selectedCategories.length) {
          const selectedIDS = selectedCategories.map(c => c.id)
          await PostsService.addNewPost({
            title: this.postItem.title,
            description: this.postItem.description,
            categories: selectedIDS
          })
          this.$helper.notify('Notification', 'Post have been added!', 'success')   
          this.$router.push({ name: 'Posts' })
        } else {
          this.postItem.title=='' ? this.validTitle = false : this.validTitle = true
          this.postItem.description=='' ? this.validDescription = false : this.validDescription = true
          selectedCategories.length ? this.validCat = true : this.validCat = false
        }
      },
      async updatePost () {
        const selectedCats = this.categories.filter(c => c.value)
        if (this.postItem.title !== '' && this.postItem.description !== '' && selectedCats.length) {
          const selectedIDS = selectedCats.map(c => c.id)
          await PostsService.updatePost({
            id: this.postItem.id,
            title: this.postItem.title,
            description: this.postItem.description,
            categories: selectedIDS
          })
          this.$helper.notify('Notification', 'Post have been updated!', 'warn')
          this.$router.push({ name: 'Posts' })
          
        } else {
          this.postItem.title=='' ? this.validTitle = false : this.validTitle = true
          this.postItem.description=='' ? this.validDescription = false : this.validDescription = true
          selectedCats.length ? this.validCat = true : this.validCat = false
        }
      },
      async fetchCategories () {
        const response = await PostsService.fetchCategories()
         response.data.categories.map(c => {
           this.categories.push({value: false, title: c.title, id: c._id})
         })
      },
      goBack () {
        this.$router.push({ name: 'Posts' })
      }
    },
    async mounted () {
      this.fetchCategories()
      const response = await PostsService.getPost({
          id: this.$attrs.id
      })
      if(response.data.posts){
        this.isAdd = false
        this.postItem.id = response.data.posts._id
        this.postItem.title = response.data.posts.title
        this.postItem.description = response.data.posts.description
        let helpArr = response.data.posts.categories.items
        this.categories.map(c => {
          helpArr.map(selectedItem => {
            if(c.id === selectedItem.categoryId._id) c.value = true
          })
        })
      }
    },
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