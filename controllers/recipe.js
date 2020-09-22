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
    // res.send('this recipe is connected')
    db.Recipe.create(req.body, (err, createdRecipeInDB) => {
        if(err) {
            console.log(err)
        } else {
            console.log(createdRecipeInDB)
            res.redirect(`/recipe/${createdRecipeInDB._id}`);
        }
    })
});




// show ONLY ONE recipe  /recipe      //show.ejs
router.get('/:id', (req,res) => {
    db.Recipe.findById(req.params.id, (err, foundRecipe) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        const context = { recipe: foundRecipe};
        res.render('recipe/show.ejs', context);
    });
});


// edit recipe  <- view   /recipe      //edit.ejs
// router.get
router.get("/:id/edit", (req, res) => {
    db.Recipe.findById(req.params.id, (err, foundRecipe) => {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      const context = { recipe: foundRecipe };
      res.render("article/edit", context);
    });
  });



// update <- db change   /recipe       //edit.ejs & index.ejs
router.put("/:id", (req, res) => {
    db.Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, updatedRecipe) => {
        if (err) {
          console.log(err);
          return res.send(err);
        }
        res.redirect(`/recipe/${updatedRecipe._id}`);
      }
    );
  });

// delete   N/A

module.exports = router;