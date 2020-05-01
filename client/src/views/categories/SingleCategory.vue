<template lang="pug">
    .container
        h2 {{ title }}
        ul.articles(v-for="article in articles" :key="article.title")
            li.article-item {{ article.articleId.title }}
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
</style>