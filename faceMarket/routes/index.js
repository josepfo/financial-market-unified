var express = require('express');
var router = express.Router();
var axios = require('axios');
var passport = require('passport');

function verificaAutenticacao(req,res,next){
	if(req.isAuthenticated()) next()
	else res.redirect('/signinup')
}

/* GET home page. */
router.get('/', verificaAutenticacao, (req, res, next) => {
	res.render('index', { title: 'FaceMarket' });
});

/* Sign in or Sign up */
router.get('/signinup', function(req, res, next) {
	res.render('signinup');
});

router.post('/login', passport.authenticate('local',{
	successRedirect: '/',
	failureRedirect: '/signinup'
}))

router.post('/register', function(req, res) {
	axios.post('http://localhost:4770/users', req.body)
		.then(()=> res.redirect('/'))
		.catch(erro => {
			console.log('Email já existe.')
			res.redirect('/signinup')
	})
});

module.exports = router;