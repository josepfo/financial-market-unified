var express = require('express');
var router = express.Router();
var axios = require('axios');

API_KEY = '&apikey=STKRW67RG4VYBDMK'

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

/* GET Pair Period. */
router.get('/:fst/:snd/:period', function(req, res) {
  var time_period
  var renderfile
  if(req.params.period.localeCompare("hourly") == 0){
      
      axios.get('https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol='+req.params.fst+'&to_symbol='+req.params.snd+'&interval=60min&outputsize=compact' + API_KEY)
      .then(resposta=> res.render('forexHourly', { answer: resposta.data }))
      .catch(erro => {
        console.log('Erro ao fazer pedido a forex.')
        res.render('error', {error: erro, message: "Erro ao fazer pedido a Alphavantage."})
      })


  }else{

      if(req.params.period.localeCompare("daily") == 0){
        time_period = "FX_DAILY"
        renderfile = 'forexDaily'
      }else
      if(req.params.period.localeCompare("weekly") == 0){
        time_period = "FX_WEEKLY"
        renderfile = 'forexWeekly'
      }else
      if(req.params.period.localeCompare("monthly") == 0){
        time_period = "FX_MONTHLY"
        renderfile = 'forexMonthly'
      }
    
      axios.get('https://www.alphavantage.co/query?function=' + time_period + '&from_symbol=' + req.params.fst + '&to_symbol=' + req.params.snd + API_KEY)
        .then(resposta=> {
          res.render(renderfile, { answer: resposta.data })
          console.warn(resposta.data)
        })
        .catch(erro => {
          console.log('Erro ao fazer pedido a forex.')
          res.render('error', {error: erro, message: "Erro ao fazer pedido a Alphavantage."})
        })
     
  }
  
});

module.exports = router;
