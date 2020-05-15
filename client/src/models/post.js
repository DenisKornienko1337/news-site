import Services from '@/services/PostsService'

class Post {
    constructor(_id, title, description, categoriesIDs) {
        this._id = _id
        this.title = title
        this.description = description
        this.categoriesIDs = categoriesIDs
    }

    async create(){
        const response = await Services.addNewPost({
            title: this.title,
            description: this.description,
            categories: this.categoriesIDs
        });
        if(response){
            return true
        }
        return false       
    }

    async update(){
        const response = await Services.updatePost({
            id: post._id,
            title: post.title,
            description: post.description,
            categories: categoriesIDs
        })    
        if(response){
            return true
        }
        return false     
    }

    static featchPosts(){
        const response = await Services.fetchPosts()
        if(response){
            return true
        }
        return false  
    }

    static async featchPosts(){
        const response = await Services.fetchPosts()
        if(response){
            return response.data.posts
        }
        return false  
    }

    static async fetchSinglePost(_id){
        const response = await Services.getPost({
            id: _id
        })  
        if(response){
            return response.data.post
        }
        return false           
    }
}

export default Post