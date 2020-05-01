
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
            input(type="checkbox" v-model="selectedCategories[index]" v-bind:true-value="category._id")
            label
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
    props: ['post'],
    data () {
      return {
        postItem: {
          id: this.$props.post._id,
          title: this.$props.post.title,
          description: this.$props.post.description,
        },
        categories:[{
          title: ''
        }],
        selectedCategories: [],
      }
    },
    methods: {
      async updatePost () {
        if (this.postItem.title !== '' && this.postItem.description !== '') {
          this.selectedCategories = this.selectedCategories.filter(function(id) {
            return !!id;
          });
          await PostsService.updatePost({
            id: this.postItem.id,
            title: this.postItem.title,
            description: this.postItem.description,
            categories: this.selectedCategories
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
      // async fetchCategories () {
      //   const response = await PostsService.fetchCategories()
      //   this.categories = response.data.categories
      // },
      goBack () {
        this.$router.push({ name: 'Posts' })
      }
    },
    async mounted () {
      // this.fetchCategories()
      const response = await PostsService.getPost({
          id: this.$attrs.id
      })
      console.log(response.data)
    }
  }
</script>
<style lang="scss">
  .container {
    max-width: 60%;
  }
</style>