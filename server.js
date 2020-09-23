/* External Modules */
const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

/* Internal Modules */
const db = require('./models');
const controllers = require('./controllers');

/* Instanced Modules */
const app = express();

/* Configuration */
const PORT = 4000;

// set view engine to ejs to leave off alldot ejs on res dot statements
app.set('view engine', 'ejs');

/* middleware */
// app.use(express.static(path.join(__dirname, "public")));
// app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
/// auth exoress session
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "Nosh",
    store: new MongoStore({
      url: "mongodb://localhost:27017/nosh_sessions",
    }),
    cookie: {
      // milliseconds
      // 1000 (one second) * 60 (one minute) * 60 (one hour) * 24 (one day) * 7 (one week) * 2
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2
    }
  }));


//auth route (in user)
app.use('/', controllers.auth);


// user Routes
app.use('/users', controllers.user);

// recipe Routes
app.use('/recipe', controllers.recipe);


// recipe routes
// INDEX HERE FOR ALL RECIPES @ NOSH
app.use('/', (req,res) => {
    db.Recipe.find({}, (error, foundRecipe) => {
      if (error) return res.send(error)

      const context = {recipes: foundRecipe, user: req.session.currentUser};
      res.render('index.ejs', context)
    })
});


/* Routes */
app.get('/', (req, res) => {
    // render("file", context)
    // console.log('hi')
    // res.send('NOSH IS OFFICIALLY CONNECTED!')
    // res.send('nosh is going to be a pretty cool app if we can get it up and running in time!')   
    res.render('index', { user: req.session.currentUser } );
});







/* Server Listener */
app.listen(PORT, () => {
    console.log(`Server is live and listening at http://localhost:${PORT}`);
  });
  


