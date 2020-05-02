
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
            button.btn.btn-block.btn-primary( v-if="isAdd" type="button", name="addPost", id="addPost", @click="addCategory()" )
              | Add category
          .form-group
            button.btn.btn-block.btn-primary( v-if="!isAdd" type="button", name="addPost", id="addPost", @click="updateCategory()" )
              | Update category
          section
            button.btn.btn-success.btn-block( type="button", @click="goBack()" )
              | Cancel
</template>

<script>
  import PostsService from '@/services/PostsService'
  export default {
    name: 'AddCategory',
    data () {
      return {
        isAdd: true,
        categoryItem: {
          title: '',
          id: ''
        },
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
      async addCategory () {
        if (this.categoryItem.title !== '') {
          await PostsService.addCategory({
            title: this.categoryItem.title,
          })
          this.$router.push({ name: 'Categories' })
        } else {
          alert('Empty fields!')
        }
      },
      goBack () {
        this.$router.push({ name: 'Categories' })
      }
    },
    async mounted() {   
        const response = await PostsService.getCategory({
            id: this.$attrs.id
        })
        if(response.data.category) {
          this.isAdd = false
          this.categoryItem.title = response.data.category.title
          this.categoryItem.id = response.data.category._id
        }
    }
  }
</script>
<style lang="scss">
  .container {
    max-width: 60%;
  }
</style>