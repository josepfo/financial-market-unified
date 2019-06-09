var passport = require('passport')
var localStrategy = require('passport-local').Strategy
var JWTstrategy = require('passport-jwt').Strategy
var ExtractJWT = require('passport-jwt').ExtractJwt
var UserModel = require('../models/user')

// Registo de um utilizador
passport.use('register', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try{
        var user = await UserModel.create({email, password})
        return done(null, user, {message: 'Registo feito com sucesso.'})
    }
    catch(error){
        return done(error)
    }
}))

// Login de utilizadores
passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (em, pass, done) => {
    try{
        var user = await UserModel.findOne({email: em})
        if(!user) 
            return done(null, false, {message: 'Utilizador não existe!'})
        var valid = await user.isValidPassword(pass)
        if(!valid)
            return done(null, false, {message: 'Password inválida!'})
        return done(null, user, {message: 'Login feito com sucesso.'})
    }
    catch(error){
        return done(error)
    }
}))

//configurar a serialização do utilizador
passport.serializeUser((user, done)=>{
    done(null, user.email)
 })
  
passport.deserializeUser(function(user, done) {
    UserModel.findOne({email : user.email}, function(err, user) {
        if (err) done(err, null);
        done(null, user)
    })
})

var extractFromSession = (req) => {
    var token = null
    if(req && req.session) token = req.session.token
    if(!token && req.headers.authorization) token = req.headers.authorization
    return token
}

passport.use('protegida', new JWTstrategy({
    secretOrKey: 'faceMarketIS',
    jwtFromRequest: ExtractJWT.fromExtractors([extractFromSession]),
}, async (token, done) => {
    try{
        return done(null, token.user)
    }
    catch(error){
        return done(error)
    }
}))