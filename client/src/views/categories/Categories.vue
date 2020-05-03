<template lang="pug">
  .container
    .row
      .col-lg-12
        h1
          | Categories

        section.panel.panel-success( v-if="categories.length" )
          AddButton(text="Add Category" path="AddCategory")
          table.table.table-striped
            tr
              th Index
              th Title
              th Delete
              th Update
            tr( v-for="(category, index) in categories", :key="category.title" )
              td {{ index }}
              td 
                router-link(:to="{name:'SingleCategory', params:{id: category._id}}")
                  | {{ category.title }}
              td 
                button( class="btn pt-0" @click="deleteOnConfirm(index)") <x-circle-icon size="2x" class="circle-icon"></x-circle-icon> 
              td
                button(class="btn" @click="roat_to_update(category._id)")
                  | <edit-2-icon size="1.5x" class="edit-icon pt-0"></edit-2-icon>
                
        section.panel.panel-danger( v-if="!categories.length" )
          p
            | There are no news ... Lets add one now!
</template>
<style lang="scss">
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
    &:hover {
      color: #0056b3;
    }
  }
</style>
<script>
  import { XCircleIcon, Edit2Icon } from 'vue-feather-icons'
  import PostsService from '@/services/PostsService'
  import AddButton from '@/components/AddButton'

  export default {
    name: 'PostsPage',
    data () {
      return {
        categories: [],
        deletedId: false
      }
    },
    components: {
      XCircleIcon, Edit2Icon, AddButton
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
        await PostsService.deleteCategories({
            id: deletedItem._id
        })          
      },
      deleteOnConfirm(index) {
        let self = this
        this.$dialog
          .confirm('Do you want delete this category?')
          .then(function() {
            self.deleteCategory(index)
            self.$helper.notify('Notification', 'Category have been deleted!', 'error')
          })
      }
    },
    mounted () {
      this.fetchCategories()
    }
  }
</script>