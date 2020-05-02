
<template lang="pug">
  .container
    .row
      .col-lg-12
        h1.test
          | Update News
        form
          .form-group
            input.form-control( type="hidden", name="id", id="id", placeholder="Id", v-model.trim="postItem._id" )
          .form-group
            input.form-control( type="text", name="title", id="title", placeholder="Title", v-model.trim="postItem.title" )
          .form-group
            textarea.form-control( type="text", rows="5", name="description", id="description", placeholder="Description", v-model.trim="postItem.description" )
          .form-group(v-for="(category, index) in categories", :key="category.title")
            input(type="checkbox" v-model="category.value")
            label
             | {{category._id}}
             | {{category.title}}
          .form-group
            button.btn.btn-block.btn-primary( type="button", name="updatePost", id="updatePost", @click="updatePost()" )
              | update news
          section
            button.btn.btn-success.btn-block( type="button", @click="goBack()" )
              | go to news page
</template>

<script>
  import PostsService from '@/services/PostsService'
  export default {
    name: 'UpdatePost',
    data () {
      return {
        postItem: {
          id: '',
          title: '',
          description: '',
        },
        categories:[],
      }
    },
    methods: {
      update: function() {
        console.log(1)
      },
      async updatePost () {
        if (this.postItem.title !== '' && this.postItem.description !== '') {
          // this.selectedCategories = this.selectedCategories.filter(function(id) {
          //   return !!id;
          // });
          const selectedCategories = this.categories.filter(c => c.value)
          const selectedIDS = selectedCategories.map(c => c.id)
          console.log(selectedIDS)
          await PostsService.updatePost({
            id: this.postItem.id,
            title: this.postItem.title,
            description: this.postItem.description,
            categories: selectedIDS
          })
          this.$notify({
            group: 'notifications',
            title: 'User notification',
            text: 'Post have been updated!',
          });  
          this.$router.push({ name: 'Posts' })
          
        } else {
          this.$dialog.alert('Fields cannot be empty!')
        }
      },
      async fetchCategories () {
        const response = await PostsService.fetchCategories()
        //this.categories = response.data.categories
        console.log( response.data.categories)
         response.data.categories.map(c => {
           this.categories.push({value: false, title: c.title, id: c._id})
         })
      },
      goBack () {
        this.$router.push({ name: 'Posts' })
      }
    },
    async mounted () {
      this.fetchCategories()
      const response = await PostsService.getPost({
          id: this.$attrs.id
      })
      this.postItem.id = response.data.posts._id
      this.postItem.title = response.data.posts.title
      this.postItem.description = response.data.posts.description
      let helpArr = response.data.posts.categories.items
      // for(let i in helpArr) {
      //   this.presetCategories.push(helpArr[i].categoryId._id)
      // }
      //this.selectedCategories = [...this.presetCategories]
      
      this.categories.map(c => {
        helpArr.map(selectedItem => {
          console.log('c.id', c.id, 'selectedItem', selectedItem)
          if(c.id === selectedItem.categoryId._id) c.value = true
        })
      })
    },
  }
</script>
<style lang="scss">
  .container {
    max-width: 60%;
  }
</style>