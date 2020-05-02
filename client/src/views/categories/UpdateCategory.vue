
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
    // props: ['category'],
    data () {
      return {
        categoryItem: {
          title: '',
          id: ''
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
          this.$notify({
            group: 'notifications',
            title: 'User notification',
            text: 'Category have been updated!',
          }); 
          this.$router.push({ name: 'Categories' })
        } else {
          alert('Empty fields!')
        }
      },
      async getCat(){        
        const response = await PostsService.getCategory({
            id: this.$attrs.id
        })
                
        this.title = response.category.title
      },
      goBack () {
        this.$router.push({ name: 'Categories' })
      }
    },    
    async mounted() {   
        const response = await PostsService.getCategory({
            id: this.$attrs.id
        })
        this.categoryItem.title = response.data.category.title
        this.categoryItem.id = response.data.category._id
    }
  }
</script>
<style lang="scss">
  .container {
    max-width: 60%;
  }
</style>