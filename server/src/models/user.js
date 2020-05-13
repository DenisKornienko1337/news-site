const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  permission: {
    permissionId: {type: mongoose.Schema.ObjectId, ref: 'Permission'}
  } 
})

userSchema.methods.setPermission = function(permission) {
  
}


const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel