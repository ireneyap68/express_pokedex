var express = require('express');
var router = express.Router();
var db = require('../models');
const axios = require('axios')
// var pokemon = require('../models/pokemon')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  
  db.pokemon.findAll().then(function(poke) {
    console.log(poke)
    res.render('faves',{pokemon: poke})
    // console.log('Found: ', poke.name)
  })
  .catch(err =>{
    res.send(err, 'error')
  })

});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create({
    name: req.body.name
  })
  .then(function(poke){
    console.log('Created: ', poke.name)
    // TODO: Get form data and add a new record to DB
    res.redirect('/');
  });

});


router.get('/:name', (req,res) =>{
  let name = req.params.name
  console.log(name)

  axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  .then((response) =>{
    console.log(response.data)
    let pokemon = response.data;
    //setting a variable to data
    res.render('show', {pokemon: pokemon})
  })
  .catch(err =>{
    console.log(err)
  })

})
module.exports = router;