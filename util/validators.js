module.exports.validateRegisterInput = (
  firstName,
  lastName,
  username,
  password,
  confirmPassword
) => {
  const errors = {}
  if (firstName.trim() === '') {
    errors.firstName = 'Firstname must not be empty'
  }
  if (lastName.trim() === '') {
    errors.lastName = 'LastName must not be empty'
  }
  if (username.trim() === '') {
    errors.username = 'Username must not be empty'
  }
  if (password === '') {
    errors.password = "Password must not be empty"
  } else if (password !== confirmPassword) {
    errors.password = "Passwords must match"
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}

module.exports.validateLoginInput = (username, password) => {
  const errors = {}
  if (username.trim() === '') {
    errors.username = 'Username must not be empty'
  }
  if (password === '') {
    errors.password = "Password must not be empty"
  } 
  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}