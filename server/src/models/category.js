const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  description: {
    type: String
  }
})

const CategoryModel = mongoose.model('Category', categorySchema)

module.exports = CategoryModel