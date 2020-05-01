<template lang="pug">
    div
       h2 {{ title }} 
</template>

<script>
  import PostsService from '@/services/PostsService'

export default {
    name: 'SingleCategory',
    data() {
        return {
            title: ''
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
   }
}
</script>

<style>

</style>