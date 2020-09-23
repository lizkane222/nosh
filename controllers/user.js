/* ===== REQUIRE. EXPRESS, ROUTER & DB ===== */
const router = require('express').Router();
const db =  require('../models');
const bcrypt = require('bcrypt');
const { findByIdAndUpdate } = require('../models/User');

const loginReqired = function(req, res, next) {
  if(!req.session.currentUser) {
      res.redirect('/login')
  }
  next();
}


// base path /
/* ===== REGISTER, LOGIN, LOGOUT USER ===== */
// --- ALL IN AUTH CONTROLLER ---


// base path /users
/* TODO ===== do second ===== */
/* ===== USER PANTRY ROUTES ===== */

// GET (user) index
router.get("/", loginReqired,  async (req, res) => {
    try {
        // const foundUser = await db.User.find({});
        const foundUser = db.User.findById(req.session.currentUser.id)
        // console.log(foundUser);
        const context = { user: foundUser }
        // console.log(context);
        res.render('user/index', context);
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal Server Error" });
    }
});

// POST  === NO LONGER NEEDED ===  NEW USER (WITH NO AUTH) 
// router.post("/", (req, res) => {
//     db.User.create(req.body, (err, createdUser) => {
//         console.log(createdUser);
//       if (error) {
//         console.log(error);
//         return res.send(error);
//       }
//       res.redirect("/users");
//     });
// });

// GET (show) USER PANTRY FROM NAVBAR
router.get("/pantry", loginReqired, (req, res) => {
  db.User.findById(req.session.currentUser.id, (error, foundUser) => {
    if(error) {
      console.log(error);
      return res.send(error)
    }
    const context = { user: foundUser }
    res.render(`user/show`, context);
  })
});

// GET (show) USER PANTRY AND FORM TO INPUT NEW PANTRY ITEMS
// TODO with recipes references (saved) similar todUsers showing articles tehy are associated with, user populte recipes
router.get("/:id", loginReqired, (req, res) => {
    db.User.findById(req.params.id, (err, foundUser) => {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      const context = { user: foundUser };
      res.render("user/show", context);
    });
});

// PUT  (update) PANTRY FOOD ITEM
router.put("/:id", loginReqired, async (req, res) => {
  try {
    const updatedItem = {
      $push: {pantry: {
              foodItem: req.body.foodItem,
              quantity: req.body.quantity,
              unit: req.body.unit,
      }},
    };
    const updatedPantry = await db.User.findByIdAndUpdate(req.params.id, updatedItem, { new: true });
    res.redirect(`/users/${req.params.id}`)
  } catch (error) {
    console.log(error);
    res.send( {message: "Something went horribly wrong [in your PUT Pantry route] please go back... in time"} );
  }
}); 

// GET (edit) USER INFO FOR UPDATE
router.get("/:id/edit", loginReqired, (req, res) => {
    // res.render('user/edit');
    db.User.findById(req.params.id, function (err, foundUser) {
        if (err) {
        console.log(err);
        return res.send(err);
        }
        const context = { user: foundUser };
        res.render("user/edit", context);
    });
});

// PUT (update) USER INFO FOR UPDATE
// TODO -- UPDATE USER INFORMATION (NOT PANTRY OR NOSH)

// GET (edit) FOODITEM UPDATE FORM PANTRY
router.get("/:id/editItem", loginReqired, (req, res) => {
  // res.send("fooditem ping back!"
  db.User.findById(req.session.currentUser.id,  (err, foundUser) => {
    if (err) {
    console.log(error)
    return res.send(err);
    }
    // this grabs the user above and the we narrow down in the code below to get the pantry item by id
    const context = { item: foundUser.pantry.id(req.params.id) };
    // console.log(context);
    res.render("user/editItem", context );
  });
});  

// PUT (updateItem) FOORITEM FROM UPDATEITEM FORM TO DB AND BACK TO USER
router.put("/:id/updateItem", loginReqired, async (req, res) => {
    try {
      // get the user from db
      const foundUser = await db.User.findById(req.session.currentUser.id)
      
      // get the user.pantry{foodites,qty,unit}
      let item = foundUser.pantry.id(req.params.id)
      
      // update items from db (left) to items from form (right)
      item.foodItem = req.body.foodItem;
      item.quantity = req.body.quantity;
      item.unit = req.body.unit;
      
      // just await then save the user
      await foundUser.save();

      // construct user context to send back to page
      const context = { user: foundUser }
      res.render(`user/show`, context);
    } catch (error) {
      console.log(error);
      res.send( {message: "Something went horribly wrong [in your PUT Food Item route] please go back... in time"} );
    }
});

// DELETE (PANTRY ITEM)
router.delete("/:id/updateItem", loginReqired, async (req, res) => {
  try {
    // get the user from db
    const foundUser = await db.User.findById(req.session.currentUser.id)

    // get the user.pantry{foodites,qty,unit} and just dot remove & then save
    let item = foundUser.pantry.id(req.params.id);
    item.remove();
    await foundUser.save();

    // construct user context to send back to page
    const context = { user: foundUser }
    res.render(`user/show`, context);
  } catch (error) {
    console.log(error);
    res.send( {message: "Something went horribly wrong [in your DELETE FOOD Item route] please go back... in time"} );
  }
}); 


// DELETE (user) (no auth) 
// TODO (this will need ot look thoough recipies too) similar to autHors and articles example
router.delete("/:id", function (req, res) {
    db.User.findByIdAndDelete(req.params.id, (error, deletedUser) => {
      if (error) {
        console.log(err);
        return res.send(err);
      }
      // console.log(deletedUser);
      res.redirect("/users");
    });
});




/* TODO ===== do third ===== */
/* ===== USER NOSH ROUTES ===== */
// get index 
        //once user selects (save) it executes post below
    
// post recipe to user nosh 
        //(when items in nosh for user, show (unsave) on save button in index & show page)
// get index
        //(if in nosh, the delete form nsoh and show button as (save))
// delete recipe from nosh






/* TODO ===== do fourth ===== */
/* ===== USER RECIPE ===== */
// simialr to nosh above

module.exports = router;