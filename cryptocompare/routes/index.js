var express = require('express');
var router = express.Router();
var axios = require('axios');

const API_KEY = '&api_key={031d68b9a5d59bce09ffa82ef258b56f97a125a7aebd7ba266e3583035ad3ed6}';

/* GET home page. */
router.get('/', function(req, res) {
  axios.all([
    axios.get('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD' + API_KEY),
    axios.get('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD' + API_KEY)
  ])
  .then(axios.spread((resposta1, resposta2) => {
    //console.log( JSON.stringify(resposta1.data.Data, null, 2) )
    //console.log( JSON.stringify(resposta2.data.Data, null, 2) )
    
    // concatenate both responses
    var target = [].concat(resposta1.data.Data, resposta2.data.Data);

    // pass only the Data field of the coins and values
    console.log(target)
    res.render('index', { answer: target })
  }))
  .catch(erro => {
    console.log('Erro ao fazer pedido a Cryptocompare.')
    res.render('error', {error: erro, message: "Erro ao fazer pedido a Cryptocompare."})
  })

});

module.exports = router;
