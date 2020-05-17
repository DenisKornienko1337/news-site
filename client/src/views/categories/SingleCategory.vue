<template lang="pug">
    .container
        h2 {{ title }}
        ul.articles-list.list-group.mt-2
          li.article-item.list-group-item(v-for="(article, index) in articles" :key="index")
            router-link(:to="{name:'SinglePost', params:{id: article.articleId._id}}") 
            //-  |  {{ article.articleId.title }} 
              
                  
</template>

<script>
  import PostsService from '@/services/PostsService'

export default {
    name: 'SingleCategory',
    data() {
        return {
            title: '',
            articles: []
        }
    },
    methods: {
    },
    async mounted() {      
        const response = await PostsService.getCategory({
            id: this.$attrs.id
        })
        
        console.log(response.data.category);
        
        this.title = response.data.category.title
        this.articles = response.data.category.articles.items
   }
}
</script>

<style lang="scss">
  .container {
    max-width: 60%;
  }
  .articles-list {
    max-width: 600px;
    text-align: left;
  }
</style>