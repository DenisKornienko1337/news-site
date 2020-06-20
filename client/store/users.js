import User from '~/actions/user'
import Category from '~/actions/category'
import Post from '~/actions/post'
import helpers from '~/helpers/checkCat'

export const state = () => ({
  userPosts: [],
  userCategories: []
})
  
export const mutations = {
  // setUsers(state, users) {
  //   state.users = users
  // }
  removeUserCategory(state, category){     
    state.userCategories.splice(category.index,1)
  },
  updateUsersPosts(state, posts){            
    state.userPosts = posts
  },
  updateUsersCategories(state, categories){
    state.userCategories = categories
  },
  userRemovePostItem(state, post){
    state.userPosts.splice(post.index,1)
  }
}
  
export const actions = {
  // async fetch({commit}) {
  //   const users = await this.$axios.$get('https://jsonplaceholder.typicode.com/users')
  //   commit('setUsers', users)
  // },

  async fetchUserPosts({commit}) {   
    const posts = await User.fetchPosts()
    
    posts.map(p => {
        if (!p.categoriesTitles) { 
          p.categoriesTitles = []
          p.categories.items.map(cat => {                    
              p.categoriesTitles.push(cat.categoryId.title)
          });
        }            
    }) 

    commit('updateUsersPosts', posts)                                         
  },
  async fetchUserCategories({commit}){
    const categories = await User.fetchCategories()

    commit('updateUsersCategories', categories)   
  },
  usersFilerByCategory({commit}, ops){
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
      
    commit('updateUsersPosts', posts)
  },
  async userRemovePost({commit}, post){
    const newPost = new Post(post)                        
    await newPost.remove()

    commit('userRemovePostItem', post)
  },
  async removeUserCategory({commit}, category){
    console.log('category', category);
    
    const newCategory = new Category(category)
    await newCategory.remove()

    commit('removeUserCategory', category)
  }
}
  
export const getters = {
  allUserPosts: s => s.userPosts,
  allUserCategories: s => s.userCategories,
}
  