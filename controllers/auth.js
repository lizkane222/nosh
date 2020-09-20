/* ===== REQUIRE. EXPRESS, ROUTER & DB ===== */
const router = require('express').Router();
const db =  require('../models');
const bcrypt = require('bcrypt');

// base psth /



// get register form
router.get('/register', (req, res) => {
    // res.send(" get a registration  ping back")
    res.render('auth/register')
})

// post register info
router.post('/register', (req, res) => {
    res.send(" get a login ping back")
})
// get login form
router.get('/login', (req, res) => {
    // res.send(" get a login ping back")
    res.render('auth/login')
})
// post login info <== authentication
router.post('/login', (req, res) => {
    res.send("post a login ping back")
})
// delete, logout <= thsi destroys teh session
router.get('/logout', (req, res) => {
    res.send("get a logout ping back")
})

module.exports = router;