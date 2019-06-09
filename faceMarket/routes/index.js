var express = require('express');
var router = express.Router();
var axios = require('axios');
var jwt = require('jsonwebtoken')
var passport = require('passport');

/* GET home page. */
router.get('/', passport.authenticate('protegida', {session: false,
        failureRedirect: '/signinup' 
    }), (req, res) => {
	res.render('index', { title: 'FaceMarket' });
});

/* Sign in or Sign up */
router.get('/signinup', (req, res) => {
	res.render('signinup');
});

// Login de um utilizador
router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {     
        try {
            if(err || !user){
                if(err) return next(err);
                else return next(new Error('Utilizador inexistente.'))
            }
            req.login(user, {session: false}, async (error) => {
                if(error) return next(error)
                const myuser = {_id: user._id} 
                const token = jwt.sign({user: myuser}, 'faceMarketIS')
                req.user.token = token
                req.session.token = token
                res.redirect('/')
            });     
        } 
        catch (error) {
            return next(error);
        }
    })(req, res, next);
});

// Registo de um utilizador
router.post('/register', async (req, res, next) => {
    passport.authenticate('register', async (err, user, info) => {     
        try {
            if(err || !user){
                if(err) return next(err);
                else return next(new Error('Utilizador inexistente.'))
            }
            req.login(user, {session: false}, async (error) => {
                if(error) return next(error)
                const myuser = {_id: user._id} 
                const token = jwt.sign({user: myuser}, 'faceMarketIS')
                req.user.token = token
                req.session.token = token
                res.redirect('/')
            });     
        } 
        catch (error) {
            return next(error);
        }
    })(req, res, next);
});

router.get('/logout',(req,res) => {
    req.session.destroy
    req.logout()
    res.redirect('/signinup')
})

module.exports = router;