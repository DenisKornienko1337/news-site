<template lang="pug">
  .container
    .row
      .col-lg-12
        h1
          | News         
        section.panel.panel-success( v-if="allUserPosts.length" )
          AddButton(text="Add News" path="NewPost")
          select.browser-default(@change="filterPosts($event)")
            option(value="-1") All
            option(v-for="(category) in allCategories" :key="category.title") {{category.title}}
          input( placeholder="Search post by title..." type="text" @input="searchPosts($event)")
          div.row
            card-item(v-for="(postItem, index) in allUserPosts" :key="index"  :postItem="postItem" :index="index" v-show="!postItem.catHide && !postItem.queryHide")
        div.input-field
        section.panel.panel-danger( v-if="!allUserPosts.length" )
          p
            | There are no news ... Lets add one now!
            
          AddButton(text="Add News" path="NewPost")
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  import AddButton from '@/components/AddButton'
  import CardItem from './CardItem'

  export default {
    name: 'CardList',
    components: {
      AddButton, 
      CardItem
    },
    data () {
      return {
        deletedId: false,
        categories: [{
          title: '',
        }],
      }
    },
    methods: {
      ...mapActions(['fetchUserPosts', 'fetchCategories','filerByTitle', 'usersFilerByCategory']),
      searchPosts(event) {
        const ops = {
            value: event.target.value,
            posts: this.allUserPosts
        }

        this.filerByTitle(ops)          

        this.$forceUpdate();
      },
      filterPosts(event) {   
        console.log(111111111111);
                       
        const ops = {
            value: event.target.value,
            posts: this.allUserPosts
        }
        console.log('this.allUserPosts', this.allUserPosts);
        
        console.log(22222222);
        this.usersFilerByCategory(ops)

        this.$forceUpdate();
      },
    },
    created() {
      this.fetchCategories()
      this.fetchUserPosts()   
    },
    computed: mapGetters(['allUserPosts','allCategories'])
  }
</script>

<style lang="scss">
.browser-default {
    max-width: 300px;
    margin: 0 auto;
    margin-top: 30px;
}
input[type="text"], input[type="password"] {
  max-width: 500px;
  margin-top: 30px !important;
  margin-bottom: 30px !important;
  &:focus {
    box-shadow: unset;
  }
  border: 2px solid #9e9e9e !important;
}

</style>