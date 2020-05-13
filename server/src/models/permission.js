const mongoose = require('mongoose')
const Schema = mongoose.Schema
const permissionSchema = new Schema({
  slug: {
    type: String,
    unique: true
  },   
})

const PermissionModel = mongoose.model('Permission', permissionSchema)

module.exports = PermissionModel