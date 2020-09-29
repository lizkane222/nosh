const express = require('express');
const { isValidObjectId } = require('mongoose');
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

 //PUT recipe:id upadte recipe
 router.put("/:id/updateRecipe", loginRequired, async (req, res) => {
    try {
      // get the recipe from db
      const foundRecipe = await db.Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
      const context = { recipe: foundRecipe, user: req.session.currentUser };
      res.render('recipe/show.ejs', context);
    } catch (error) {
    console.log(error);
    res.send( {message: "Something went horribly wrong [in your PUT UpdateRecipe route] please go back... in time"} );
    }
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

// GET recipe_id/foodtiem_id --- SAME FUNCTION AS PANTRY FOOD ITEM DIFF ROUTE BUT NEEDS RECIPE ID ---
router.get("/:recipe_id/:id/editItem", loginRequired, (req, res) => {
    db.Recipe.findById(req.params.recipe_id,  (err, foundRecipe) => {
      if (err) {
      console.log(error)
      return res.send(err);
      }
      // this grabs the recipe & fooditems associates with recipe
      const context = { recipe : foundRecipe, item: foundRecipe.foodItems.id(req.params.id) };
      res.render("recipe/editItem", context );
    });
    // res.send("fooditem ping back!")
  }); 


// PUT recipe_id/foodtiem_id
router.put("/:recipe_id/:id/updateItem", loginRequired, async (req, res) => {
    try {
      // get the recipe from db
      const foundRecipe = await db.Recipe.findById(req.params.recipe_id)
      // get the recipe.foodItem{foodites,qty,unit}
      let item = foundRecipe.foodItems.id(req.params.id)
      // update items from db (left) to items from form (right)
      item.foodName = req.body.foodName;
      item.quantity = req.body.quantity;
      item.unit = req.body.unit;
      // just await then save the user
      await foundRecipe.save();
      // construct context to send back to page
      const context = { recipe: foundRecipe, user: req.session.currentUser }
      res.render(`recipe/show`, context);
    } catch (error) {
      console.log(error);
      res.send( {message: "Something went horribly wrong [in your PUT recipe.fooditem route] please go back... in time"} );
    }
});

// DELETE recipe_id/foodtiem_id
router.delete("/:recipe_id/:id/updateItem", loginRequired, async (req, res) => {
    try {
      // get the recipe from db
      const foundRecipe = await db.Recipe.findById(req.params.recipe_id)
      // get the recipe.foodItems{foodites,qty,unit} and just dot remove & then save
      let item = foundRecipe.foodItems.id(req.params.id);
      item.remove();
      await foundRecipe.save();
      // construct user context to send back to page
      const context = { recipe: foundRecipe, user: req.session.currentUser  }
      res.render(`recipe/show`, context);
    } catch (error) {
      console.log(error);
      res.send( {message: "Something went horribly wrong [in your DELETE recipe FOOD Item route] please go back... in time"} );
    }
  });

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