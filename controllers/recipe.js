const express = require('express');
const router = express.Router();
const db = require('../models');


/* base path *//*    /recipe     */
// for file path use /recipe/__.ejs

// // index view of recipes    /recipe  //index.ejs (MAIN INDEX.EJS)
router.get('/', (req,res) => {
    // res.send("ROUTE'S CONNECTED TO THE ALL RECIPES PAGE")
    db.Recipe.find({}, (error, foundRecipe) => {
        if(error) return res.send(error)
    
    const context = {recipes: foundRecipe};
    res.render('recipe/index.ejs', context);
});
});

// new recipe   /recipe    //new.ejs
router.get('/new', (req,res) => {
    res.render('recipe/new.ejs');
});


// create recipe  /recipe     //new.ejs
router.post('/new', (req,res) => {
    // res.send('this recipe is connected')
    db.Recipe.create(req.body, (error, createdRecipeInDB) => {
        if(error) {
            console.log(error)
        } else {
            console.log(createdRecipeInDB)
            res.redirect(`/recipe/${createdRecipeInDB._id}`);
        }
    })
});


// show ONLY ONE recipe  /recipe      //show.ejs
router.get('/:id', (req,res) => {
    db.Recipe.findById(req.params.id, (error, foundRecipe) => {
        if (error) {
            console.log(error);
            return res.send(error);
        }
        const context = { recipe: foundRecipe};
        res.render('recipe/show.ejs', context);
    });
});

// edit recipe  <- view   /recipe      //edit.ejs
// router.get
router.get("/:id/edit", (req, res) => {
    // res.send('THE RECIPE IS READY TO EDIT')
    db.Recipe.findById(req.params.id, (error, foundRecipe) => {
      if (error) {
        console.log(error);
        return res.send(error);
      }
      const context = { recipe: foundRecipe };
        res.render(`recipe/edit`, context);
    });
});



// update <- db change   /recipe       //edit.ejs & index.ejs
// router.put("/:id", (req, res) => {
//     db.Recipe.findByIdAndUpdate( req.params.id,req.body,{ new: true },(error, updatedRecipe) => {
//         if (error) {
//           console.log(error);
//           return res.send(error);
//         }
//         const context = { recipe: updatedRecipe };
        
//         // res.redirect(`/recipe/${updatedRecipe._id}`, context);
//       }
//     );
//   });

// delete   N/A

module.exports = router;