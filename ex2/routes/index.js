var express = require('express');
var router = express.Router();
var data = new Date().toISOString().substring(0,16);
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get("http://localhost:15030/plantas")
    .then(response => {
      res.render('index', { plantas: response.data, d: data });
    })
    .catch(err => {
      res.render('error', {error: err})
    })
});

// GET registo
router.get('/:id', function(req, res, next) {
  axios.get("http://localhost:15030/plantas/" + req.params.id)
    .then(response => {
      res.render('registo', { planta: response.data, d: data });
    })
    .catch(err => {
      res.render('error', {error: err})
    })
});

// GET especie
router.get('/especies/:id', function(req, res, next) {
  console.log(req.params.id)
  axios.get("http://localhost:15030/plantas?especie=" + req.params.id)
    .then(response => {
      res.render('especies', { lista: response.data, d: data });
    })
    .catch(err => {
      res.render('error', {error: err})
    })
});

router.get('/delete/:id', function(req, res) {
  axios.delete("http://localhost:15030/plantas/" + req.params.id)
    .then(resp => {
      res.redirect('/');
    })
    .catch(err => {
      res.render('error', {error: err})
    })
})

router.post('/', function(req, res, next) {
  axios.post("http://localhost:15030/plantas", req.body)
    .then(response => {
      console.log(req.body)
      res.redirect('/');
    })
    .catch(err => {
      res.render('error', {error: err})
    })
})



module.exports = router;
