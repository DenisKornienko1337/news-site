
<template lang="pug">
  .container
    .row
      .col-md-9
        h1
          span(v-if="isAdd") Add News
          span(v-else) Update News
        form
          .form-group
            input.form-control( type="text", name="title", id="title", placeholder="Title", v-model.trim="postItem.title" v-validate="'required'" )
            div(class="validation-error") {{ errors.first('title') }}
          .form-group 
            textarea.form-control( type="text", rows="10", name="description", id="description", placeholder="Content", v-model.trim="postItem.description" v-validate="'required'" )
            div(class="validation-error") {{ errors.first('description') }}
            div(class="post-image" v-if="postItem.imageId")
              img(:src="server_url+postItem.imageId")
            div.input-file(@change="uploadImage")
              input(type="file" accept="image/*")
          .form-group.text-left.action-buttons
            button.btn.btn-primary.blue( v-if="isAdd" type="button", name="updatePost", id="updatePost", @click="addPost()" )
              | add news
            button.btn.btn-primary.blue( v-if="!isAdd" type="button", name="updatePost", id="updatePost", @click="updatePost()" )
              | update news
            button.btn.btn-success.blue( type="button", @click="goBack()" )
              | go to news page
      .col-md-3
        .sidebar-right
          h3 Categories
          input(type="hidden" name="categories" v-validate:selectedCats="'required'")
          div(class="validation-error") {{ errors.first('categories') }}
          label(v-for="(category, index) in categories", :key="category.title")
            input(type="checkbox" v-model="category.value")
            span
            | {{category.title}}
</template>

<script>
  import {mapActions} from 'vuex'
  import config from '@/config/config'

  export default {
    name: 'UpdatePost',
    data () {
      return {
        server_url: config.server_url,
        selectedCats: []
      }
    },
    methods: {
      ...mapActions(['fetchCategories','fetchPosts','createPost', 'updateSinglePost']),
      uploadImage(e){
        const image = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onload = e => {
          this.postItem.image = e.target.result
        }
      },
      addPost () {
        const selected = this.categories.filter(c => c.value)
        this.selectedCats = selected
        
        this.$validator.validateAll()        
        .then(() => {
          if (!this.errors.any()) {            
            const selectedCategories = this.categories.filter(c => c.value)
            const selectedIDS = selectedCategories.map(c => {
                return {
                  _id: c._id,
                  title: c.title
                } 
            })
            const post = {
              title: this.postItem.title,
              description: this.postItem.description,
              categories: selectedIDS,
              image: this.postItem.image,
            }                        
            this.createPost(post).then(() => {
              this.$helper.notify('Notification', 'Post have been added!', 'success')
              this.$router.push({ name: 'AdminNews' })
            } )                
          } 
        })     
      },
      updatePost () {        
        const selected = this.categories.filter(c => c.value)
        this.selectedCats = selected
        this.$validator.validateAll()
        .then(() => {
          if (!this.errors.any()) {
            const selectedCats = this.categories.filter(c => c.value)
            const selectedIDS = selectedCats.map(c => {
              return {
                _id: c._id,
                title: c.title
              } 
            })    
                  
            const post = {
              _id: this.postItem._id,
              title: this.postItem.title,
              description: this.postItem.description,
              categories: selectedIDS,
              image: this.postItem.image
            }
            this.updateSinglePost(post)
            .then(() => {              
              this.$helper.notify('Notification', 'Post have been updated!', 'warn')
              this.$router.push({ name: 'AdminNews' }) 
            })
          }        
        })     
      },
      goBack () {
        this.$router.go({ name: 'AdminNews' })
      }
    },
    mounted () {
      this.fetchCategories()
      this.fetchPosts()
    },
    watch: {
      categories: function(){        
        if(this.categories.filter(c => c.value).length){          
          const selected = this.categories.filter(c => c.value)  
          this.selectedCats = selected      
        }
        return this.categories        
      }
    },
    computed: {
      isAdd: function(){
        if(this.$attrs.id) return false;
        return true
      },

      categories: function(){
        if (this.$store.state.category.categories){          
          if(this.postItem.categories){            
            this.postItem.categories.items.map(postCat => {
              this.$store.state.category.categories.map(c => {
                if(postCat.categoryId._id === c._id) {
                  c.value = true
                }
              })
            })
          }
          return this.$store.state.category.categories;
        }
        return []
      },
      postItem: function(){
        const posts = this.$store.state.post.posts;

        if(posts.length && this.$attrs.id){
          const findPostItem = posts.find(p => p._id === this.$attrs.id)
          return findPostItem;
        } 
        return {
          id: '',
          title: '',
          description: '',
          categories: {
            items: []
          },
          image: '',
        }
      }
    }
  }
</script>
<style lang="scss">
  .input-file {
    text-align: left;
    margin-top: 20px;
  }
  .sidebar-right {
    padding-left: 30px;
    margin-top: 70px;
    label {
      text-align: left;
      display: block !important;
    }
  }
  .action-buttons {
    button {
      margin-top: 20px !important;
      width: 200px;
      margin-left: 20px !important;
      display: inline-block;
    }
  }
  .container {
    max-width: 80%;
  }
</style>