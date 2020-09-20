/* ===== REQUIRE. EXPRESS, ROUTER & DB ===== */
const router = require('express').Router();
const db =  require('../models');
const bcrypt = require('bcrypt');




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
router.get("/",  (req, res) => {
    res.render('user/index');

});

// get new user form
router.get("/newUser",  (req, res) => {
    res.render('user/newUser');
    // 1. async/await keywords
    // 2. try/catch block
    // try {
    //     const foundUser = await db.User.find({});
    //     const context = {
    //     user: foundUser,
    //     }
    //     res.render("user/index", context);
    // } catch (error) {
    //     console.log(error);
    //     res.send({ message: "Internal Server Error" });
    // }
});
// post new user (for now so I can make pantry without login)
router.post("/", function (req, res) {
    db.User.create(req.body, function (err, createdUser) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
  
      res.redirect("/user/index");
    });
  });
// get new pantry form
router.get("/newPantry",  (req, res) => {
    res.render('user/newPantry');

});
// post new pantry info
// show user with recipes references (saved) similar to authors showing articles tehy are associated with, user populte recipes
// get (edit)  pantry info
router.get("/editPantry",  (req, res) => {
    res.render('user/edit');

});

// put (update) pantry info
// delete user (this will need ot look thoough recipies too) similar to autors and articles example removes from user & recipe






/* TODO ===== do fourth ===== */
/* ===== USER RECIPE ===== */
// simialr to nosh above

module.exports = router;