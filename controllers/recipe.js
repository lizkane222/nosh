const express = require('express');
const router = express.Router();
const db = require('../models');
// const bcrypt = require('bcrypt.js');

/* base path *//*    /recipes     */


// index view of recipes    /recipes    //index.ejs


// new recipe   /recipes    //new.ejs


// create recipe  /recipes     //new.ejs


// show recipe  /recipes      //show.ejs


// edit recipe  <- view   /recipes      //edit.ejs


// update <- db change   /recipes       //edit.ejs & index.ejs


// delete   N/A

module.exports = router;


//////////////////////////////////////////////////////////

/*Jason, I forgot to add these into the user controller.*/

//////////////////////////////////////////////////////////

// const express = require('express');
// const router = express.Router();
// const db = require('../models');
// const bcrypt = require('bcrypt.js');   //leave this commented out else{error}

/* base path */  //=>   /users


// index view   /users    //index.ejs
/*  */

// new pantry   /users    //newPantry.ejs


// create pantry   /users    //newPantry.ejs


// show ???  /users  //???


// edit <- view   /users    //edit.ejs


// update pantry  <- db change   /users    //newPantry.ejs --> newPantry.ejs


// delete user  /users   //edit.ejs --> ??? auth/register.ejs ???


// module.exports = router;