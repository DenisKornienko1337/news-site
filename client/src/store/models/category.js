import Services from '@/services/PostsService'

export default {
    actions: {
        async fetchCategories(ctx) {
            setTimeout( async function(){
                const response = await Services.fetchCategories()
                const categories = response.data.categories
                ctx.commit('updateCategories', categories)
            }, 500);
        },
        async fetchSinglePost(ctx, catId) {
            const response = await Services.getCategory({
                id: catId
            })
            const category = response.data.category
            ctx.commit('updateCategories', category)
        },
        async createCategory(ctx, category){
            await Services.addCategory({
                title: category.title
            })
            ctx.commit('pushCategory',category);
        },
        async updateSingleCategory(ctx, category){
            await Services.updateCategory({
                title: category.title,
                id: category._id,
            })
            ctx.commit('updateCategoryItem', category)
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
        },
        updateCategoryItem(state, category){
            // const updatedCategoryIndex = state.categories.findIndex( c => c._id === category._id )
            state.categoryies = category
            // let updatedCategoryies = state.categoryies;
            // updatedCategoryies[updatedCategoryIndex] = category;       
        },
        pushCategory(state, category){
            state.categoryies.push(category)
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