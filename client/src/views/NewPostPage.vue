
<template lang="pug">
  .container
    .row
      .col-lg-12
        h1.test
          | Add News
        form
          .form-group
            input.form-control( type="text", name="title", id="title", placeholder="Title", v-model.trim="post.title" )
          .form-group
            textarea.form-control( type="text", rows="5", name="description", id="description", placeholder="Description", v-model.trim="post.description" )
          .form-group(v-for="(category, index) in categories", :key="category.title")
            input(type="checkbox" v-model.trim="category.title")
            label(v-model.trim="category.title")
             | {{category.title}}

          .form-group
            button.btn.btn-block.btn-primary( type="button", name="addPost", id="addPost", @click="addPost()" )
              | add news
          section
            button.btn.btn-success.btn-block( type="button", @click="goBack()" )
              | go to news page
</template>

<script>
  import PostsService from '@/services/PostsService'
  export default {
    name: 'NewPostPage',
    data () {
      return {
        post: {
          title: '',
          description: ''
        },
        categories:[{
          title: ''
        }]
      }
    },
    methods: {
      async addPost () {
        if (this.post.title !== '' && this.post.description !== '') {
          await PostsService.addNewPost({
            title: this.post.title,
            description: this.post.description,
            categories: this.categories
          })
          
          console.log('Created');
          
          this.$router.push({ name: 'Posts' })
        } else {
          alert('Empty fields!')
        }
      },
      async fetchCategories () {
        const response = await PostsService.fetchCategories()
        this.categories = response.data.categories
      },
      goBack () {
        this.$router.push({ name: 'Posts' })
      }
    },
    mounted () {
      this.fetchCategories()
    }
  }
</script>
<style lang="scss">
  .container {
    max-width: 60%;
  }
</style>