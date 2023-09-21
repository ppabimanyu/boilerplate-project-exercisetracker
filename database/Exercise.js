const { Schema, model, Types } = require('mongoose')

const exerciseSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  userId: {
    type: Types.ObjectId,
    required: true
  }
})

exerciseSchema.set('toJSON', {
  transform: (document, obj) => {
    delete obj.__v
    delete obj.userId
  }
})

const Exercise = model('Exercise', exerciseSchema)

module.exports = Exercise