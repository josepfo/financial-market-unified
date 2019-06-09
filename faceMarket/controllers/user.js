var User = require('../models/user')

module.exports.email = em => {
    return User
        .findOne({email: em})
        .exec()
}

module.exports.inserir = user => {
    return User.create(user)
}