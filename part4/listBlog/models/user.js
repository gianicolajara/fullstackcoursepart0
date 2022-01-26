const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    minlength: 3,
    maxlength: 18,
    trim: true,
  },
  password: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
    minlength: 3,
    maxlength: 18,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  },
})

userSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)
  return hashPassword
}

userSchema.statics.comparePassword = async function (password, hashPassword) {
  const res = bcrypt.compareSync(password, hashPassword)
  return res
}

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
