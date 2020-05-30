import User from '../controllers/user'
import helpers from '@/helpers/checkCat'

export default {
    actions: {
        async fetchUserPosts(ctx) {   
            const posts = await User.fetchPosts()
            
            posts.map(p => {
                if (!p.categoriesTitles) { 
                    p.categoriesTitles = []
                    p.categories.items.map(cat => {                    
                        p.categoriesTitles.push(cat.categoryId.title)
                    });
                }            
            }) 
      
            ctx.commit('updateUsersPosts', posts)                                         
        },
        usersFilerByCategory(ctx, ops){
            const value = ops.value
            const posts = ops.posts
            
            console.log('ops', ops);
            
            for(let i in posts) {
              if(value==-1) {
                posts[i].catHide = false
              } else {
                let flag = helpers.isInCategories(posts[i].categories.items, value)
                posts[i].catHide = flag
              }
            }
            
            ctx.commit('updateUsersPosts', posts)
        }
    },
    mutations: {
        updateUsersPosts(state, posts){            
            state.userPosts = posts
        },
    },
    state: {
        userPosts: []
    },
    getters: {
        allUserPosts(state){
            return state.userPosts
        }
    }
}