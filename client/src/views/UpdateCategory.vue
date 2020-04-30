
<template lang="pug">
  .container
    .row
      .col-lg-12
        h1.test
          | Add News
        form
          .form-group
            input.form-control( type="text", name="title", id="title", placeholder="Title", v-model.trim="categoryItem.title" )
          .form-group
            button.btn.btn-block.btn-primary( type="button", name="addPost", id="addPost", @click="updateCategory()" )
              | add category
          section
            button.btn.btn-success.btn-block( type="button", @click="goBack()" )
              | go to news page
</template>

<script>
  import PostsService from '@/services/PostsService'
  export default {
    name: 'UpdateCategory',
    props: ['category'],
    data () {
      return {
        categoryItem: {
          title: this.$props.category.title,
          id: this.$props.category._id
        }
      }
    },
    methods: {
      async updateCategory () {
        if (this.categoryItem.title !== '') {
          await PostsService.updateCategory({
            title: this.categoryItem.title,
            id: this.categoryItem.id,
          })
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