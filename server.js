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

app.set('view engine', 'ejs');

/* middleware */
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
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

/* Routes */
app.get('/', (req, res) => {
    // render("file", context)
    // console.log('hi')
    // res.send('NOSH IS OFFICIALLY CONNECTED!')
    // res.send('nosh is going to be a pretty cool app if we can get it up and running in time!')   
    res.render('index', { user: req.session.currentUser } );
});


// view routes
// CREATE INDEX HERE FOR ALL OF RECIPES
app.get('/', (req,res) => {
      res.render('index.ejs')
  });

app.get('./controllers/recipe', (req, res) => {

  db.Recipe.find({}, (error, allRecipesFromDB) => {
    if(error) return res.send(error);
    
    const context = allRecipes = allRecipesFromDB
      res.render('index.ejs', context)
  });
})


//auth route (in user)
app.use('/', controllers.auth);

// recipe Routes
app.use('/recipe', controllers.recipe);



// user Routes
app.use('/users', controllers.user);




/* Server Listener */
app.listen(PORT, () => {
    console.log(`Server is live and listening at http://localhost:${PORT}`);
  });
  


