import Services from '@/services/PostsService'

class User {
    constructor(_id) {
        this._id = _id
    }

    static async fetchPosts(){
        const response = await Services.getUserPosts()
        
        if(response){
            return response.data.posts
        }
        return false  
    }
}

export default User