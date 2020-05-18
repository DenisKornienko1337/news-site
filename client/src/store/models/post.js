import Services from '@/services/PostsService'
import Post from '../controllers/post'
import helpers from '@/helpers/checkCat'

export default {
    actions: {
        fetchPosts(ctx) {           
            Post.featchPosts()
            .then(posts => {     
                console.log('posts', posts);          
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
            })
            .catch(err => console.log(err))         
        },
        async fetchSinglePost(ctx, postId) {
            const response = await Services.getPost({
                id: postId
            })            
            const posts = response.data.posts
            ctx.commit('updatePosts', posts)
        },
        // async createPost(ctx, post){
        //     const categoriesIDs = post.categories.map(c => c._id)
        //     await Services.addNewPost({
        //         title: post.title,
        //         description: post.description,
        //         categories: categoriesIDs
        //     });

        //     post = {
        //         title: post.title,
        //         description: post.description,
        //         categories: post.categories 
        //     }

        //     ctx.commit('pushPost', post)
        // },
        createPost(ctx, post){                         
            const categoriesIDs = post.categories.map(cat => cat._id)
            post.categoriesIDs = categoriesIDs

            const newPost = new Post(post)            
            newPost.create()
            .then(() => ctx.commit('pushPost', post))                 
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
        async removePost(ctx, post){
            await Services.deletePosts({
                id: post._id
            })
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
        // pushPost(state, post) {                  
        //     state.posts.push(post)
        // },
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