var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
	email: {type: String, required: true},
	password: {type: String, required: true},
	descricao: {type: String},
})

module.exports = mongoose.model('Users', UserSchema, 'users')