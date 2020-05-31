import User from '../controllers/user'
import Post from '../controllers/post'
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
        async fetchUserCategories(ctx){
            const categories = await User.fetchCategories()

            ctx.commit('updateUsersCategories', categories)   
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
        },
        async userRemovePost(ctx, post){
            const newPost = new Post(post)                        
            await newPost.remove()

            ctx.commit('userRemovePostItem', post)
        },
    },
    mutations: {
        updateUsersPosts(state, posts){            
            state.userPosts = posts
        },
        updateUsersCategories(state, categories){
            state.userCategories = categories
        },
        userRemovePostItem(state, post){
            state.userPosts.splice(post.index,1)
        }
    },
    state: {
        userPosts: [],
        userCategories: []
    },
    getters: {
        allUserPosts(state){
            return state.userPosts
        },
        allUserCategories(state){
            return state.userCategories
        }
    }
}