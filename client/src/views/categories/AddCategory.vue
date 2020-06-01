
<template lang="pug">
  .container
    .row
      .col-md-12
        h1.test
          | Add Category
        form
          .form-group
            input.form-control( type="text", name="title", id="title", placeholder="Title", v-model.trim="categoryItem.title" v-validate="'required'")
            div(class="validation-error") {{ errors.first('title') }}
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
  import {mapActions} from 'vuex'
  export default {
    name: 'AddCategory',
    methods: {
      ...mapActions(['fetchCategories','createCategory','updateSingleCategory']),
      updateCategory () {        
        this.$validator.validateAll()
        .then(() => {
          if (!this.errors.any()) {  
            this.updateSingleCategory(this.categoryItem).then(() => {
              this.$router.push({ name: 'AdminCategories' })
              this.$helper.notify('Notification', 'Category have been updated!', 'warn')
            })
          }
        })        
      },
      addCategory () {        
        this.$validator.validateAll()
        .then(() => {
          if (!this.errors.any()) { 
            this.createCategory(this.categoryItem).then(() => {
              this.$router.push({ name: 'AdminCategories' })
              this.$helper.notify('Notification', 'Category have been added!', 'success')
            })
          }
        })        
      },
      goBack () {
        this.$router.push({ name: 'AdminCategories' })
      }
    },
    mounted() { 
      this.fetchCategories()
    },
    computed: {
      categoryItem: function(){ 
        const categories = this.$store.state.category.categories;
        if (categories.length && this.$attrs.id) {          
          const findCatItem = categories.find(c => c._id === this.$attrs.id)
          return findCatItem;
        }
        return {
          title: ''
        }        
      },
      isAdd: function (){
        return !this.$attrs.id ? true : false
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