<template lang="pug">
  .container
    .row
      .col-lg-12
        h1
          | Categories
        h3
          | This file will list all the news

        section.panel.panel-success( v-if="categories.length" )
          .panel-heading
            | list of categories
          table.table.table-striped
            tr
              th Index
              th Title
              th Update
            tr( v-for="(category, index) in categories", :key="category.title" )
              td {{ index }}
              td 
                router-link(:to="{name:'SingleCategory', params:{id: category._id}}")
                  | {{ category.title }}
              td 
                button( class="btn btn-danger" @click="deleteCategory(index)") Delete
              td
                button(class="btn btn-primary" @click="roat_to_update(category._id)")
                  | Update
                
        section.panel.panel-danger( v-if="!categories.length" )
          p
            | There are no news ... Lets add one now!
          div
            router-link( :to="{ name: 'AddCategory'}" )
              | add news
        div
            router-link( :to="{ name: 'AddCategory' }" )
              | add  news
</template>

<script>
  import PostsService from '@/services/PostsService'
  export default {
    name: 'PostsPage',
    data () {
      return {
        categories: [],
        deletedId: false
      }
    },
    methods: {
      async roat_to_update(catId){
        const response = await PostsService.getCategory({
            id: catId
        })
        this.$router.push({ name: 'UpdateCategory', params: {id: catId} })
        console.log(response);
      },
      async fetchCategories () {
        const response = await PostsService.fetchCategories()
        this.categories = response.data.categories
      },
      async deleteCategory(index) {
        const deletedItem = this.categories[index]
        
        this.categories.splice(index,1)   
        this.$notify({
          group: 'notifications',
          title: 'User notification',
          text: 'Category have been deleted!',
          type: 'error'
        }); 
        await PostsService.deleteCategories({
            id: deletedItem._id
        })          
      }
    },
    mounted () {
      this.fetchCategories()
    }
  }
</script>