var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
/* GET home page. */
router.get('/', async function(req, res, next) {
  const response = await fetch('https://mauricio.inf.br/p6/api/list/')
  const names = await response.json();
  console.log(names);
  res.render('index', { title: 'Express' , names: names.veiculos});
});

async function loadVehicles(){
  const response = await fetch('https://mauricio.inf.br/p6/api/list/')
  const names = await response.json();
  console.log(names);
} 
loadVehicles();

module.exports = router;
