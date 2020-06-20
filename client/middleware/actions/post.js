import PostRoutes from '../routes/post'

class Post {
    constructor({_id, title, description, categoriesIDs, image}) {
      // this.post = {
      //     _id: _id,
      //     title: title,
      //     description: description,
      //     categoriesIDs: categoriesIDs,
      //     image: image
      // }
      this._id = _id
      this.title = title
      this.description = description
      this.categoriesIDs = categoriesIDs
      this.image = image
    }

    async create(){ 
      const response = await PostRoutes.addNewPost({
        title: this.title,
        description: this.description,
        categories: this.categoriesIDs,
        image: this.image,
      });
      if(response){
          return true
      }
      return false       
    }

  async update(){
    const response = await PostRoutes.updatePost({
      id: this._id,
      title: this.title,
      description: this.description,
      categories: this.categoriesIDs,
      image: this.image,
    })    
    if(response){
        return true
    }
    return false     
  }

  async remove(){
    const response = await PostRoutes.deletePosts({
        id: this._id
    })        
    if(response){
        return true
    }
    return false  
  }

  static async featchPosts(){
    const response = await PostRoutes.fetchPosts()

    console.log(response.data.posts);
    
    if(response){
        return response.data.posts
    }
    return false  
  }

  static async fetchSinglePost(_id){
    const response = await PostRoutes.getPost({
        id: _id
    })  
    if(response){
        return response.data.post
    }
    return false           
  }
}

export default Post