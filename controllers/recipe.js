const express = require('express');
const router = express.Router();
const db = require('../models');

/* base path *//*    /recipe     */
// for file path use /recipe/__.ejs

// // index view of recipes    /recipes  //index.ejs (MAIN INDEX.EJS)
// router.get('/', (req,res) => {
//     res.render('index.ejs')
// });

// new recipe   /recipes    //new.ejs
router.get('/newForm', (req,res) => {
    res.render('recipe/new.ejs');
});

// create recipe  /recipes     //new.ejs
router.post('/newForm', (req,res) => {
    db.Recipe.create(req.body, (err, createdRecipeInDB) => {
        if(err) {
            console.log(err)
        } else {
            console.log(createdRecipeInDB)
            res.redirect('/recipe/newForm');
        }
    })
});

// show ONLY ONE recipe  /recipes      //show.ejs
router.get('/:id', (req,res) => {
    res.render('recipe/show.ejs')
});

// edit recipe  <- view   /recipes      //edit.ejs


// update <- db change   /recipes       //edit.ejs & index.ejs


// delete   N/A

module.exports = router;