import Services from '@/services/PostsService'

export default {
    actions: {
        async fetchCategories(ctx) {
            const response = await Services.fetchCategories()
            const categories = response.data.categories
            ctx.commit('updateCategories', categories)
        },
    },
    mutations: {
        updateCategories(state, categories){
            state.categories = categories
        }
    },
    state: {
        categories: []
    },
    getters: {
        allCategories(state){
            return state.categories
        }
    }
}