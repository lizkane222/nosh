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
    db.Recipe.find({}, (err, foundRecipe) => {
        if(eff) return res.send(err);

        const context = {
            recipes : foundRecipe,
        }

        res.render('recipe/new.ejs', context);
    })
});

// create recipe  /recipes     //new.ejs
router.post('/newForm', (req,res) => {
    console.log(req.body);
    db.Recipe.create(req.body, (err, createdRecipeInDB) => {
        if(err) {
            console.log(err);
            return res.send(err);
        }
        db.User.findById(req.body.recipe, (err, foundUser) => {
            if(err) {
                console.log(err);
                return res.send(err)
            }

            foundUser.recipes.push(createdRecipeInDB);
            foundUser.save();
            
            res.redirect('/newForm');
        })
        }
    )
});

// show ONLY ONE recipe  /recipes      //show.ejs
router.get('/:id', (req,res) => {
    res.render('recipe/show.ejs')
});

// edit recipe  <- view   /recipes      //edit.ejs


// update <- db change   /recipes       //edit.ejs & index.ejs


// delete   N/A

module.exports = router;