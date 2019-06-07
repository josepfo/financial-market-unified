var express = require('express');
var router = express.Router();
var axios = require('axios');
const moment = require('moment');

const API_KEY = '&api_key={031d68b9a5d59bce09ffa82ef258b56f97a125a7aebd7ba266e3583035ad3ed6}';

/* GET home page. */
router.get('/', function(req, res) {
  axios.get('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD' + API_KEY)
    .then(resposta=> res.render('crypto', { answer: resposta.data.Data }))
    .catch(erro => {
      console.log('Erro ao fazer pedido a crypto.')
      res.render('error', {error: erro, message: "Erro ao fazer pedido a Cryptocompare."})
    })
});

/* GET Crypto Period. */
router.get('/:crypto/:period', function(req, res) {
  // get period
  var time_period
  switch (req.params.period) {
    case "hourly":
      time_period = 'histohour'
      break;
    case "daily":
      time_period = 'histoday'
      break;
    default:
      console.log("Período escolhido indisponível ou errado.")
      break;
  }

  axios.get('https://min-api.cryptocompare.com/data/' + time_period + '?fsym=' + req.params.crypto + '&tsym=USD&limit=10' + API_KEY)
    .then(resposta=> {
      
      var ans = resposta.data.Data
      //console(ans)
      // reverter lista
      //ans = ans.reverse()
      // pegar apenas 10 primeiros elementos
      //ans = ans.slice(0, 10)
      
      // modificar milisec para date
      //ans.forEach(entry => entry.time = moment(entry.time).format('MMMM MM YYYY h:mm:ss'));
      //console.log(resposta.data.dataset_data.data)
      res.render('crypto-time', { crypto: req.params.crypto + ' ' + req.params.period, answer: ans })
    })
    .catch(erro => {
      console.log('Erro ao fazer pedido a commodity.')
      res.render('error', {error: erro, message: "Erro ao fazer pedido a Cryptocompare."})
    })

});

module.exports = router;