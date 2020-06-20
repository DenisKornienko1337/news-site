export default {
  isInCategories(cats, value){
    for(let i in cats) {
      if(cats[i].categoryId.title == value) return false
    }
    return true
  }
}