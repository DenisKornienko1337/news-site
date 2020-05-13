import Services from '@/services/PostsService'
import helpers from '@/helpers/checkCat'

export default {
    actions: {
        async fetchPosts(ctx) {
            setTimeout( async function(){
                const response = await Services.fetchPosts()

                const posts = response.data.posts
                posts.map(p => {
                    if (!p.categoriesTitles) { 
                        p.categoriesTitles = []
                        p.categories.items.map(cat => {                    
                            p.categoriesTitles.push(cat.categoryId.title)
                        });
                    }            
                })           
    
                ctx.commit('updatePosts', posts)
            }, 500)
            
        },
        async fetchSinglePost(ctx, postId) {
            const response = await Services.getPost({
                id: postId
            })
            
            const posts = response.data.user
            ctx.commit('updatePosts', posts)
        },
        async createPost(ctx, post){
            const categoriesIDs = post.categories.map(c => c._id)
            await Services.addNewPost({
                title: post.title,
                description: post.description,
                categories: categoriesIDs
            });                     
            
            post = {
                title: post.title,
                description: post.description,
                categories: post.categories 
            }
            
            ctx.commit('pushPost', post)
        },
        async updateSinglePost(ctx, post){
            const categoriesIDs = post.categories.map(c => c._id)
              
            await Services.updatePost({
                id: post._id,
                title: post.title,
                description: post.description,
                categories: categoriesIDs
            })        
            
            ctx.commit('updatePostItem', post)
        },
        async deletePost(ctx, post){
            await Services.deletePosts({
                id: post._id
            })
            ctx.commit('removePost', post)
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

            const updatedPostIndex = state.posts.findIndex( p => p._id === post._id )
            
            let updatedPosts = state.posts;
            updatedPosts[updatedPostIndex] = post;            
            
            state.posts = updatedPosts     
        },
        pushPost(state, post) {            
            const categoriesTitles = post.categories.map(c => c.title)

            post.categoriesTitles = categoriesTitles;  

            const updatedPosts = state.posts;
            updatedPosts.push(post)
            console.log(updatedPosts);
            
            state.posts = updatedPosts
        },
        removePost(state, post){
            state.posts = state.posts.splice(post.index,1)
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