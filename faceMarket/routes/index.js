var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

/* Sign in or Sign up */
router.get('/signinup', function(req, res, next) {
	res.render('signinup');
});


module.exports = router;
