const express = require('express');
const router = express.Router();
const db = require('../models');


/* base path *//*    /recipe     */
// for file path use /recipe/__.ejs

// // index view of recipes    /recipe  //index.ejs (MAIN INDEX.EJS)
// router.get('/', (req,res) => {
//     res.render('index.ejs')
// });

// new recipe   /recipe    //new.ejs
router.get('/new', (req,res) => {
    res.render('recipe/new.ejs');
});
// router.get('/newForm', (req,res) => {
    // db.Recipe.find({}, (err, foundRecipe) => {
    //     if(eff) return res.send(err);

    //     const context = {
    //         recipes : foundRecipe,
    //     }

    //     res.render('recipe/new.ejs', context);
    // })
// });

// create recipe  /recipe     //new.ejs
router.post('/new', (req,res) => {
    res.send('this recipe is connected')
    // db.Recipe.create(req.body, (err, createdRecipeInDB) => {
    //     if(err) {
    //         console.log(err)
    //     } else {
    //         console.log(createdRecipeInDB)
    //         // res.redirect('/recipe/:id');
    //     }
    // })
});


// router.post('/newForm', (req,res) => {
//     console.log(req.body);
    // db.Recipe.create(req.body, (err, createdRecipeInDB) => {
    //     if(err) {
    //         console.log(err);
    //         return res.send(err);
    //     }
    //     db.User.findById(req.body.recipe, (err, foundUser) => {
    //         if(err) {
    //             console.log(err);
    //             return res.send(err)
    //         }

    //         foundUser.recipes.push(createdRecipeInDB);
    //         foundUser.save();
            
    //         res.redirect('/newForm');
    //     })
    //     }
    // )
    // 
// });

// show ONLY ONE recipe  /recipe      //show.ejs
router.get('/:id', (req,res) => {
    res.render('recipe/show.ejs')
});


// edit recipe  <- view   /recipe      //edit.ejs
// router.get

// update <- db change   /recipe       //edit.ejs & index.ejs


// delete   N/A

module.exports = router;