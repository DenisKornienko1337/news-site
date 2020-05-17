import User from '@/models/user'

export default {
    actions: {
        async fetchUserPosts(ctx) {   
            User.fetchPosts()
            .then(Posts => {
                let posts = Posts
                posts.map(p => {
                    if (!p.categoriesTitles) { 
                        p.categoriesTitles = []
                        p.categories.items.map(cat => {                    
                            p.categoriesTitles.push(cat.categoryId.title)
                        });
                    }            
                })       
                ctx.commit('updatePosts', posts)
            })
                
                          
        },
    },
    mutations: {
        updatePosts(state, posts){            
            state.posts = posts
        },
    },
    state: {
        posts: []
    },
    getters: {
        allUserPosts(state){
            return state.posts
        }
    }
}