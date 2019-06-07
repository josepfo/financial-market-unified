var express = require('express');
var router = express.Router();
var User = require('../controllers/user')

/* GET users listing. */
router.get('/:uid', function(req, res, next) {
	User.consultar(req.params.uid)
		.then(dados => res.jsonp(dados))
		.catch(erro => res.status(500).send('Erro na consulta de utilizador.'))
});

router.post('/', (req,res)=>{
	User.inserir(req.body)
		.then(dados => res.jsonp(dados))
		.catch(erro => res.status(500).send('Erro na inserção de utilizador.'))
})

module.exports = router;