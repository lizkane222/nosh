const mongoose = require("mongoose");


// Schema("template", optional configuration obj)
const recipeSchema = new mongoose.Schema({
    recipeName: {type: String, required: true},
    
})

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;

