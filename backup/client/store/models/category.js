import Category from '../controllers/categories'

export default {
    actions: {
        async fetchCategories(ctx) {
            const categories = await Category.fetchCategories()
            
            ctx.commit('updateCategories', categories)
        },
        async fetchSinglePost(ctx, catId) {            
            const category = await Category.fetchCategories(catId)
            
            ctx.commit('updateCategories', category)
        },
        async createCategory(ctx, category){
            const newCategory = new Category(category)
            await newCategory.create()

            ctx.commit('pushCategory',category);
        },
        async updateSingleCategory(ctx, category){
            const newCategory = new Category(category)
            await newCategory.update()

            ctx.commit('updateCategoryItem', category)
        },
        async removeCategory(ctx, category){
            const newCategory = new Category(category)
            await newCategory.remove()

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
            state.categories.map( cat => {
                if(cat._id === category._id){
                    cat = category;
                }
            });      
        },
        pushCategory(state, category){            
            state.categories.push(category)
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