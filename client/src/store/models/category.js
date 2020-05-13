import Services from '@/services/PostsService'

export default {
    actions: {
        async fetchCategories(ctx) {
            const response = await Services.fetchCategories()
            const categories = response.data.categories
            ctx.commit('updateCategories', categories)
        },
        async removeCategory(ctx, category){
            await Services.deleteCategories({
                id: category._id
            })  
            ctx.commit('removeCategoryItem', category)
        }
    },
    mutations: {
        updateCategories(state, categories){
            state.categories = categories
        },
        removeCategoryItem(state, category){            
            state.categories.splice(category.index,1)
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