const bcyrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')

const { SECRET_KEY } = require('../../config')
const User = require('../../models/User')
const { validateRegisterInput, validateLoginInput} = require('../../util/validators')

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username
    }, 
    SECRET_KEY, 
    { expiresIn: '1h'}
  )
}

module.exports = {
  Mutation: {
    async register(_, {registerInput: {firstName, lastName, username, password, confirmPassword}}) {
      const { valid, errors } = validateRegisterInput(firstName, lastName, username, password, confirmPassword)
      if (!valid) {
        throw new UserInputError('Errors', {errors})
      }

      const user = await User.findOne({username})
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: 'This username is taken'
          }
        })
      }

      password = await bcyrpt.hash(password, 12)
      const newUser = new User({
        firstName,
        lastName,
        username,
        password,
        createdAt: new Date().toISOString()
      })

      const res = await newUser.save()
      const token = generateToken(res)

      return {
        ...res._doc,
        id: res._id,
        token
      }
    },

    async login (_, {loginInput: {username, password}}) {
      const { valid, errors } = validateLoginInput(username, password)
      if (!valid) {
        throw new UserInputError('Errors', {errors})
      }
      const user = await User.findOne({username});
      if (!user) {
        errors.general = 'User not found'
        throw new UserInputError('User not found', {errors})
      }
      const match = await bcyrpt.compare(password, user.password)
      if (!match) {
        errors.general = 'Wrong credentials'
        throw new UserInputError('Wrong credentials', {errors})
      }
      const token = generateToken(user)
      return {
        ...user._doc,
        id: user._id,
        token
      }
    }
  }
}