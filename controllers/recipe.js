const express = require('express');
const router = express.Router();
const db = require('../models');



const loginRequired = function(req, res, next) {
    if(!req.session.currentUser) {
        res.redirect('/login')
    }
    next();
}

/* base path *//*    /recipe     */
// for file path use /recipe/__.ejs

// index view of recipes    /recipe  //index.ejs (MAIN INDEX.EJS)
// router.get('/', (req,res) => {
//     // res.send("ROUTE'S CONNECTED TO THE ALL RECIPES PAGE")
//     db.Recipe.find({}, (error, foundRecipe) => {
//         if(error) return res.send(error)
    
//     const context = {recipes: foundRecipe};
//     res.render('recipe/index.ejs', context);
// });
// });

// new recipe   /recipe    //new.ejs
router.get('/new', loginRequired, async (req,res) => {
    try {
        const context = {recipe: ""};
        if(req.query.recipeID){
            const foundRecipe = await db.Recipe.findById(req.query.recipeID)
            context.recipe = foundRecipe
        }
        // const context = {recipeID: foundRecipe};

        res.render('recipe/new.ejs', context)
    } catch (error) {
        console.log(error)
        return res.send({message:'Internal Server Error: check recipe-controller new-route'})
    }
});




// CREATE recipe  /recipe     //new.ejs

router.post('/new', async (req,res) => {
    try {
        const createdRecipeInDB = await db.Recipe.create(req.body);
        const context = {recipeID : createdRecipeInDB._id,}
        
        // res.redirect(`recipe/${recipeID}`, context);
        res.redirect(`/recipe/new?recipeID=${createdRecipeInDB._id}`);
    } catch (error) {
        console.log(error)
        res.send({message:'Internal Server Error: check recipe-controller create-route'});
    } 
    
});

// show ONLY ONE recipe  /recipe      //show.ejs
router.get('/:id', loginRequired, (req,res) => {
    db.Recipe.findById(req.params.id, (error, foundRecipe) => {
        if (error) {
            console.log(error);
            return res.send(error);
        }
        const context = { recipe: foundRecipe, user: req.session.currentUser };
        res.render('recipe/show.ejs', context);
    });
});

// edit recipe  <- view   /recipe      //edit.ejs
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
router.put("/:id/foodItem", async (req, res) => {
    // res.send('UPDATE IS READ')
    try {
        const updatedItem = {
            $push: {foodItems: {
                    foodName: req.body.foodItem,
                    quantity: req.body.quantity,
                    unit: req.body.unit,
                    calories: req.body.unit,
        }}};
        console.log(updatedItem);
        const updatedRecipe = await db.Recipe.findByIdAndUpdate( req.params.id, updatedItem,{ new: true })
        console.log(updatedRecipe);
        res.redirect(`/recipe/new?recipeID=${updatedRecipe._id}`);
    } catch (error) {
        console.log(error)
        res.send({message:'Internal Server Error: check recipe-controller update-route'});
    }
    
  });


// // PUT  (update) PANTRY FOOD ITEM
// router.put("/:id", async (req, res) => {
//     try {
//       const updatedItem = {
//         $push: {pantry: {
//                 foodItem: req.body.foodItem,
//                 quantity: req.body.quantity,
//                 unit: req.body.unit,
//         }},
//       };
//       const updatedPantry = await db.User.findByIdAndUpdate(req.params.id, updatedItem, { new: true });
//       res.redirect(`/users/${req.params.id}`)
//     } catch (error) {
//       console.log(error);
//       res.send( {message: "Something went horribly wrong [in your PUT Pantry route] please go back... in time"} );
//     }
//   }); 






// delete   N/A
router.delete("/:id", (req,res) => {
    db.Recipe.findByIdAndDelete(req.params.id,
        (error) => {
            if(error) {
                console.log(error);
                return res.send(err);
            }
            const context = {}
        res.redirect('/recipe') 
        })
})






module.exports = router;