/* External Modules */
const express = require('express');
const methodOverride = require('method-override');

/* Internal Modules */
const db = require('./models');
const controllers = require('./controllers');

/* Instanced Modules */
const app = express();

/* Configuration */
const PORT = 4000;

app.set('view engine', 'ejs');

/* middleware */
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

/* Routes */
app.get('/', (req, res) => {
    // render("file", context)
    // console.log('hi')
    // res.send('NOSH IS OFFICIALLY CONNECTED!')
    res.send('nosh is going to be a pretty cool app if we can get it up and running in time!')   
    // res.render('index');
});


// view routes

// recipe Routes
// app.use('/recipes', controllers.recipe);

// user Routes
// app.use('/users', controllers.user);


/* Server Listener */
app.listen(PORT, () => {
    console.log(`Server is live and listening at http://localhost:${PORT}`);
  });
  


