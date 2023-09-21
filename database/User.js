const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  }
})

userSchema.set('toJSON', {
  transform: (document, obj) => {
    delete obj.__v
  }
})

userSchema.set('toObject', {
  transform: (document, obj) => {
    delete obj.__v
  }
})

const User = model('User', userSchema)

module.exports = User