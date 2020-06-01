import Services from '@/services/PostsService'

class Category {
    constructor({_id, title}) {
        this._id = _id
        this.title = title
    }

    async create(){
        const response = await Services.addCategory({
            title: this.title,
        });
        if(response){
            return true
        }
        return false       
    }

    async update(){
        const response = await Services.updateCategory({
            id: this._id,
            title: this.title
        })    
        if(response){
            return true
        }
        return false     
    }

    async remove(){
        const response = await Services.deleteCategories({
            id: this._id
        })  
        
        if(response){
            return true
        }
        return false  
    }

    static async fetchCategories(){
        const response = await Services.fetchCategories()
        if(response){
            return response.data.categories
        }
        return false  
    }

    static async fetchSingleCategory(_id){
        const response = await Services.getCategory({
            id: _id
        })  
        if(response){
            return response.data.category
        }
        return false           
    }
}

export default Category