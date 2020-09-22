const mongoose = require("mongoose");


// Schema("template", optional configuration obj)
const recipeSchema = new mongoose.Schema({
    recipeName: {type: String, required: true},
    // narrative Description are the recipe's exact instructions, NOT owner's thoughts about dish which will be at tag.text
    narrativeDescription: {type: String, required: false},
            // if outside source exists provide it, if source does not exist not required
    imageSource: {type: String, required: false},
            // serving size per recipe
    servesPeople: {type: Number, required: true},
            // must provide numHours, hours is already filled in NO Option to choose,
            // must provide numMinutes, minutes is already filled in NO Option to choose,
    cookTime: {type: Number, required: true
        // {numHours: {type: Number, required: false}},
        // numMinutes: 
    },
            // restrict to available options ("beginner","intermediate", "expert" )
    skillLevel: {type: String, required: false},

    // totalCalories is a function that sums foodItem.calories
    // DON'T PUT totalCALORIES IN FORM

    totalCalories: {type: Number, required: false},
    
})

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;

