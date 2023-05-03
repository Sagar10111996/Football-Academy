const { model, schema, Schema } = require('mongoose')

const userSchema = new Schema({
  firstName: { type: String, required: true},
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, required: false, default: true},
})

module.exports = model('User', userSchema)