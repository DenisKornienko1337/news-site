<template lang="pug">
    h2
        {{ title }}
</template>

<script>
export default {
    name: 'SingleCategory',
    data() {
        return {
            title: ''
        }
    },
    methods: {
        async getCat(){        
            const response = await PostsService.getCategory({
                id: this.$attrs.id
            })
                    
            this.title = response.category.title
      },
    },
    mounted: {
        getCat()
    }
}
</script>

<style>

</style>