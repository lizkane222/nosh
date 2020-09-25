/* ===== REQUIRE. EXPRESS, ROUTER & DB ===== */
const router = require('express').Router();
const db =  require('../models');
const bcrypt = require('bcrypt');

// base path /

/// =====  REGISTER
// GET register form
router.get('/register', (req, res) => {
    // res.send(" get a registration  ping back")
    res.render('auth/register')
})

// POST register info
router.post("/register", async function(req, res) {
    // res.send(" get a login ping back")
    try {
        // search db to see if user already exists (using email)
        const foundUser = await db.User.findOne({ email: req.body.email });
        // if a user is found, send back an error
        if(foundUser) {
            return res.send({ message: "Account is already registered" });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        // create user with req.body and hashed password
        await db.User.create(req.body);
        console.log(` register req dot body ${req.body}`)

        // redirect to login
        res.redirect("/login");
    } catch (error) {
        res.send({ message: "Register Internal Server Error", err: error });
    }
});



/// =====  LOGIN
// GET login form
router.get('/login', (req, res) => {
    // res.send(" get a login ping back")
    res.render('auth/login')
})

// POST login info <== authentication
router.post("/login", async function(req, res) {
    // res.send("post a login ping back")
    try {
        // see if the user exists (using email)
        const foundUser = await db.User.findOne({ email: req.body.email });
        // if they do not exist, send error
        if(!foundUser) {
            // return res.redirect('/register');
            return res.send({ message: "Email or Password spelled incorrectly, or you have not registered with nosh" });
        }
        // if they do exist, compare db password with entered password using bcrypt (return true/false)
        const match = await bcrypt.compare(req.body.password, foundUser.password);
        // if passwords don't match, send error
        if(!match) {
            return res.send({ message: "Email or Password incorrect" });
        }
        // if passwords match, create sesssion for authentication
        console.log(`login b4 req dot body ${req.body}`)
        req.session.currentUser = {
            username: foundUser.username,
            id: foundUser._id,
            nosh: foundUser.nosh,
            pantry: foundUser.pantry,
        }
        console.log(`login after req dot body ${req.session.currentUser}`)
        // redirect to nosh/index
        res.redirect("/")
    } catch (error) {
        res.send({ message: " Login Internal Server Error", err: error });
    }
})



/// =====  LOGOUT
// DELETE, logout <= this destroys the session, not user
router.delete("/logout", async function(req, res) {
    // res.send("get a logout ping back")
    await req.session.destroy();
    res.redirect("/");
})



module.exports = router;