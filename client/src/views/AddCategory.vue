
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
            button.btn.btn-block.btn-primary( type="button", name="addPost", id="addPost", @click="addCategory()" )
              | add category
          section
            button.btn.btn-success.btn-block( type="button", @click="goBack()" )
              | go to news page
</template>

<script>
  import PostsService from '@/services/PostsService'
  export default {
    name: 'AddCategory',
    data () {
      return {
        post: {
          title: ''
        }
      }
    },
    methods: {
      async addCategory () {
        if (this.post.title !== '') {
          await PostsService.addCategory({
            title: this.post.title,
          })
          this.$notify({
            group: 'notifications',
            title: 'User notification',
            text: 'Category have been created!',
            type: 'success',
          }); 
          this.$router.push({ name: 'Categories' })
        } else {
          alert('Empty fields!')
        }
      },
      goBack () {
        this.$router.push({ name: 'Categories' })
      }
    }
  }
</script>
<style lang="scss">
  .container {
    max-width: 60%;
  }
</style>