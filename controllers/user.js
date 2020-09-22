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
/* SECTION ===== do first ===== */
/* ===== REGISTER, LOGIN, LOGOUT USER ===== */
// in auth controller



/* TODO ===== do third ===== */
/* ===== USER NOSH ===== */
// get index 
        //once user selects (save) it executes post below
    
// post recipe to user nosh 
        //(when items in nosh for user, show (unsave) on save button in index & show page)
// get index
        //(if in nosh, the delete form nsoh and show button as (save))
// delete recipe from nosh


// base path /users
/* TODO ===== do second ===== */
/* ===== USER PANTRY ===== */
// index
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

// get new user form
router.get("/foodItem",  (req, res) => {
    res.render('user/foodItem');
});

// post new user (for now so I can make pantry without login)
router.post("/", (req, res) => {
    db.User.create(req.body, (err, createdUser) => {
        console.log(createdUser);
      if (error) {
        console.log(error);
        return res.send(error);
      }
      res.redirect("/users");
    });
});

// get new user pantry form
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

// TODO post new pantry info

// show user pantry - DONE 
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

// get (edit)  pantry info
// router.get("/:id/edit", loginReqired, (req, res) => {
//     // res.render('user/edit');
//     db.User.findById(req.params.id, function (err, foundUser) {
//         if (err) {
//         console.log(err);
//         return res.send(err);
//         }
//         const context = { user: foundUser };
//         res.render("user/edit", context);
//     });
// });

// get (edit)  pantry info
router.get("/foodItem/:id", loginReqired, (req, res) => {
  // res.render('user/edit');
  db.User.findById(req.params.id, function (err, foundItem) {
      if (err) {
      console.log(err);
      return res.send(err);
      }
      const context = { item: foundItem };
      res.render("user/foodEdit", context);
  });
});


// put (update) pantry info
router.put("/:id", loginReqired, async (req, res) => {
      try {
        const pantryData = {
          $push: {pantry: {
                  foodItem: req.body.foodItem,
                  quantity: req.body.quantity,
                  unit: req.body.unit,
          }},
        };
        const updatedPantry = await db.User.findByIdAndUpdate(req.params.id, pantryData, { new: true });
        res.redirect(`/users/${req.params.id}`)
      } catch (error) {
        console.log(error);
        res.send( {message: "Something went wrong please go back."} );
      }
 });   


// delete user - DONE 
// TODO (this will need ot look thoough recipies too) similar to autHors and articles example
router.delete("/:id", function (req, res) {
    db.User.findByIdAndDelete(req.params.id, (error, deletedUser) => {
      if (error) {
        console.log(err);
        return res.send(err);
      }
      console.log(deletedUser);
      res.redirect("/users");
    });
});






/* TODO ===== do fourth ===== */
/* ===== USER RECIPE ===== */
// simialr to nosh above

module.exports = router;