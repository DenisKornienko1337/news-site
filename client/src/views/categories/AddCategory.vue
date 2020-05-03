
<template lang="pug">
  .container
    .row
      .col-md-12
        h1.test
          | Add Category
        form
          .form-group
            input.form-control( type="text", name="title", id="title", placeholder="Title", v-model.trim="categoryItem.title" )
            .validation-error(v-if="!valid") This field cannot be empty!
          .form-group
          .form-group.text-left.action-buttons
            button.btn.btn-primary.blue( v-if="isAdd" type="button", name="addPost", id="addPost", @click="addCategory()" )
              | Add category
            button.btn.btn-primary.blue( v-if="!isAdd" type="button", name="addPost", id="addPost", @click="updateCategory()" )
              | Update category
            button.btn.btn-success.blue( type="button", @click="goBack()" )
              | Cancel
</template>

<script>
  import PostsService from '@/services/PostsService'
  export default {
    name: 'AddCategory',
    data () {
      return {
        valid: true,
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
          this.$helper.notify('Notification', 'Category have been updated!', 'warn')
        } else {
          this.valid = false
        }
      },
      async addCategory () {
        if (this.categoryItem.title !== '') {
          await PostsService.addCategory({
            title: this.categoryItem.title,
          })
          this.$router.push({ name: 'Categories' })
          this.$helper.notify('Notification', 'Category have been added!', 'success')
        } else {
          this.valid = false
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
  .validation-error {
    font-size: 14px;
    text-align: left;
    color: red;
  }
  .container {
    max-width: 60%;
  }
</style>