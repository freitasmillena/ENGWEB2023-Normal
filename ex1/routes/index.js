var express = require('express');
var router = express.Router();
var Planta = require('../controllers/planta')

//GET /plantas/freguesias
router.get('/plantas/freguesias', function(req, res) {
  Planta.getFreguesias()
    .then(registo => {
      res.jsonp(registo)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção das freguesias"})
    })
});

//GET /plantas/especies
router.get('/plantas/especies', function(req, res) {
  Planta.getEspeciesList()
    .then(registo => {
      res.jsonp(registo)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção das espécies"})
    })
});

// GET /plantas
router.get('/plantas', function(req, res, next) {
  if (req.url.includes("especie")){
    Planta.getEspecies(req.query.especie)
    .then(lista => {
      res.jsonp(lista)
    })
    .catch(erro => {
      console.log("Erro na obtenção da lista com registos desta especie")
    })
  }
  else if  (req.url.includes("implant"))
  {
    Planta.getImplant(req.query.implant)
    .then(l => {
      res.jsonp(l)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista com este implant"})
    })
  }
  else{
  Planta.list()
    .then(listas => {
      res.jsonp(listas)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção das lista de plantas"})
    })
  }
});

// GET /plantas/:id
router.get('/plantas/:id', function(req, res) {
    Planta.getRegisto(req.params.id)
      .then(registo => {
        res.jsonp(registo)
      })
      .catch(erro => {
        res.render('error', {error: erro, message: "Erro na obtenção do registo"})
      })
});

//POST /plantas
router.post('/plantas', function(req, res) {
  Planta.addRegisto(req.body)
    .then(lista => {
      res.jsonp(lista)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na inserção do registo"})
    })
})

// DELETE /plantas/:id
router.delete('/plantas/:id', function(req, res) {

    Planta.deleteRegisto(req.params.id)
      .then(dados => {
        res.jsonp(dados)
      })
      .catch(erro => {
        res.render('error', {error: erro, message: "Erro na eliminação de um registo"})
      })
})

module.exports = router;
