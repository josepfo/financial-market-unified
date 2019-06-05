var express = require('express');
var router = express.Router();
var axios = require('axios');

const API_KEY = '&api_key=QY8zng_hFHyM3DEwWxiM';

/* GET home page. */
router.get('/', function(req, res) {

  axios.all([
    // GOLD COMEX
    axios.get('https://www.quandl.com/api/v3/datasets/CHRIS/CME_GC1/data.json?&limit=1&collapse=daily' + API_KEY)
  ])
  .then(axios.spread((resposta1, resposta2) => {
    //console.log( JSON.stringify(resposta1.data.Data, null, 2) )
    //console.log( JSON.stringify(resposta2.data.Data, null, 2) )

    // concatenate both responses
    var target = [].concat(resposta1.data.Data, resposta2.data.Data);

    // pass only the Data field of the coins and values
    console.log(target)
    //res.render('commodity', { answer: target })
  }))
  .catch(erro => {
    console.log('Erro ao fazer pedido a commodity.')
    res.render('error', {error: erro, message: "Erro ao fazer pedido a Quandl."})
  })

});

module.exports = router;
