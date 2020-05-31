import Post from '../controllers/post'
import helpers from '@/helpers/checkCat'

export default {
    actions: {
        async fetchPosts(ctx) {
            const posts = await Post.featchPosts()            
            posts.map(p => {
                p.userName = p.userId.name
                if (!p.categoriesTitles) { 
                    p.categoriesTitles = []
                    p.categories.items.map(cat => {                    
                        p.categoriesTitles.push(cat.categoryId.title)
                    });
                } 
            })

            ctx.commit('updatePosts', posts)               
        },
        async fetchSinglePost(ctx, postId) {
            const post = await Post.fetchSinglePost(postId)
            
            ctx.commit('updatePosts', post)
        },
        async createPost(ctx, post){                         
            const categoriesIDs = post.categories.map(cat => cat._id)
            post.categoriesIDs = categoriesIDs

            const newPost = new Post(post)                        
            await newPost.create()

            ctx.commit('pushPost', post)            
        },
        async updateSinglePost(ctx, post){                   
            const categoriesIDs = post.categories.map(cat => cat._id)
            post.categoriesIDs = categoriesIDs

            const newPost = new Post(post)                        
            await newPost.update()
            
            ctx.commit('updatePostItem', post)
        },
        async removePost(ctx, post){
            const newPost = new Post(post)                        
            await newPost.remove()

            ctx.commit('removePostItem', post)
        },
        filerByTitle(ctx, ops){
            const value = ops.value
            const posts = ops.posts
            
            for(let i in posts) {
                if(posts[i].title.toLowerCase().includes(value.toLowerCase())) {
                    posts[i].queryHide = false
                } else {
                    posts[i].queryHide = true
                }
            }
            ctx.commit('updatePosts', posts)
        },
        filerByCategory(ctx, ops){
            const value = ops.value
            const posts = ops.posts
            
            for(let i in posts) {
              if(value==-1) {
                posts[i].catHide = false
              } else {
                let flag = helpers.isInCategories(posts[i].categories.items, value)
                posts[i].catHide = flag
              }
            }
            
            ctx.commit('updatePosts', posts)
        }
    },
    mutations: {
        updatePosts(state, posts){            
            state.posts = posts
        },
        updatePostItem(state, post){
            const categoriesTitles = post.categories.map(c => c.title)

            post.categoriesTitles = categoriesTitles;  
            state.posts.map( p => {
                if(p._id === post._id) p = post
            })
        },
        pushPost(state, post) {
            const categoriesTitles = post.categories.map(c => c.title)

            post.categoriesTitles = categoriesTitles;

            state.posts.push(post)
        },
        removePostItem(state, post){
            state.posts.splice(post.index,1)
        }
    },
    state: {
        posts: []
    },
    getters: {
        allPosts(state){
            return state.posts
        }
    }
}