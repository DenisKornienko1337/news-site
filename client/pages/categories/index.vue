<template lang="pug">
  .container
    .row
      .col-lg-12
        h1
          | Categories
        section.panel.panel-success( v-if="allCategories.length" )
          AddButton(text="Add Category" path="AddCategory")
          table.table.table-striped
            tr
              th Index
              th Title
              th Delete
              th Update
            tr( v-for="(category, index) in allCategories", :key="category.title" )
              td {{ index }}
              td 
                span
                  | {{ category.title }}
              td 
                button( class="btn pt-0" @click="deleteOnConfirm(index)") <x-circle-icon size="2x" class="circle-icon"></x-circle-icon> 
              td
                router-link(class="btn" :to="{ name: 'UpdateCategory', params: {id: category._id} }")
                  //- | <edit-2-icon size="1.5x" class="edit-icon pt-0"></edit-2-icon>
                
        section.panel.panel-danger( v-if="!allCategories.length" )
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
  import {mapActions, mapGetters} from 'vuex'
  import { XCircleIcon, Edit2Icon } from 'vue-feather-icons'
  import AddButton from '@/components/AddButton'

  export default {
    name: 'Categories',
    components: {
      XCircleIcon, Edit2Icon, AddButton
    },
    methods: {
      ...mapActions(['fetchCategories', 'removeCategory']),
      async deleteCategory(index) {
        const category = {
          _id: this.allCategories[index]._id,
          index: index
        }
        this.removeCategory(category)
      },
      deleteOnConfirm(index) {
        let self = this
        // this.$dialog
        //   .confirm('Do you want delete this category?')
        //   .then(function() {
        //     self.deleteCategory(index)
        //     self.$helper.notify('Notification', 'Category have been deleted!', 'error')
        //   })
      }
    },
    created() {
      this.fetchCategories()
    },
    // computed: {
    //   allCategories: function(){
    //     // this.$forceUpdate();
    //     return this.$store.state.category.categories
    //   }
    // }
    computed:mapGetters(['allCategories'])
  }
</script>