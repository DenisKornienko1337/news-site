const mongoose = require('mongoose')
const Schema = mongoose.Schema
const projectSchema = new Schema({
  photo_url: {
    type: String,
  },
  supervisor: {
    type: String
  },
  title: {
    type: String
  },
  part_money: {
    type: Number
  },
  level: {
    type: String
  },
  about: {
    type: String
  }
})

const ProjectModel = mongoose.model('Project', projectSchema)

module.exports = ProjectModel