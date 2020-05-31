import Services from '@/services/PostsService'

class User {
    constructor({_id}) {
        this._id = _id
    }

    static async fetchPosts(){
        const response = await Services.getUserPosts()
        
        if(response){
            return response.data.posts
        }
        return false  
    }

    static async fetchCategories(){
        const response = await Services.getUserCategories()
        
        if(response){
            return response.data.categories
        }
        return false  
    }

    static async logIn({name, password}){
        try {            
            await Services.logIn({
                name: name,
                password: password
            })
            return true
        } catch(err){
            return false
        }        
    } 

    static async addUser({name, password}){
        try {
            await Services.addUser({
                name: name,
                password: password
            })
            return true
        } catch(err){
            return false
        }
    }
}

export default User