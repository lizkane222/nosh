const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt.js');

/* base path *//*    /recipes     */

// index view of recipes    /recipes    //index.ejs
router.get('/', (req,res) => {
    res.render('/recipe/index.ejs')
});

// new recipe   /recipes    //new.ejs
// router.get('/new', (req,res) => {
//     res.render('./new.ejs');
// });

// create recipe  /recipes     //new.ejs
// router.post('/', (req,res) => {
    
// });

// show recipe  /recipes      //show.ejs
// router.get('/:id', (req,res) => {
//     res.render('')
// });

// edit recipe  <- view   /recipes      //edit.ejs


// update <- db change   /recipes       //edit.ejs & index.ejs


// delete   N/A

module.exports = router;