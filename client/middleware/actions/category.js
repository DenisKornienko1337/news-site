import CategoryRoutes from '../routes/category'

class Category {
  constructor({_id, title}) {
      this._id = _id
      this.title = title
  }

  async create(){
    const response = await CategoryRoutes.addCategory({
      title: this.title,
    });
    if(response){
      return true
    }
    return false       
  }

  async update(){
      const response = await CategoryRoutes.updateCategory({
        id: this._id,
        title: this.title
      })    
      if(response){
        return true
      }
      return false     
  }

  async remove(){
      const response = await CategoryRoutes.deleteCategories({
        id: this._id
      })  
      
      if(response){
        return true
      }
      return false  
  }

  static async fetchCategories(){
    const response = await CategoryRoutes.fetchCategories()
    if(response){
      return response.data.categories
    }
    return false  
  }

  static async fetchSingleCategory(_id){
    const response = await CategoryRoutes.getCategory({
      id: _id
    })  
    if(response){
        return response.data.category
    }
    return false           
  }
}

export default Category