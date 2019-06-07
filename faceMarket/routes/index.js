var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

/* Sign in or Sign up */
router.get('/signinup', function(req, res, next) {
	res.render('signinup');
});

router.post('/register', function(req, res) {
	axios.post('http://localhost:4770/users', req.body)
		.then(()=> res.redirect('http://localhost:4770/'))
		.catch(erro => {
			console.log('Email já existe.')
			res.redirect('http://localhost:4770/signinup')
	})
});

module.exports = router;