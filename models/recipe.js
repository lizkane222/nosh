const mongoose = require("mongoose");


// Schema("template", optional configuration obj)
const recipeSchema = new mongoose.Schema({
    recipeName: {type: String, required: true},
    // narrative Description are the recipe's exact instructions, NOT owner's thoughts about dish which will be at tag.text
    narrativeDescription: {type: String, required: false},
            // if outside source exists provide it, if source does not exist not required
    imageSource: {type: String, required: false},
            // serving size per recipe
    servesPeople: {type: Number, required: false},
            // must provide numHours, hours is already filled in NO Option to choose,
            // must provide numMinutes, minutes is already filled in NO Option to choose,
    cookTime: {type: Number, required: false},
        // {numHours: {type: Number, required: false}},
        // numMinutes: 

            // restrict to available options ("beginner","intermediate", "expert" )
    skillLevel: {type: String, required: false},

    // totalCalories is a function that sums foodItem.calories
    // DON'T PUT totalCALORIES IN FORM

    totalCalories: {type: String, required: false},
    


    foodItems: [
        {
            foodName: {type: String, required: false},
            quantity: {type: String, required: false},
            unit: {type: String, required: false},
            calories: {type: String, required: false},
        },

    ],

        tag: [
        {  //add a minimum requirement of 3 tags
            tagName: {type:String, required: false},
            count: {type: String, required: false},
            saverDescription: {type: String, required: false},
        },
    ],

    // // on save2Nosh recipe.savers = user._id    
    // savers: [{
    //     // reference
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //         // this will not count the number of users associated with this recipe
    // },],
    //     // the creator the recipe is the owner, the user._id is the value
    //     // owner gets transferred to Team-Nosh-Admin-User when owner deletes recipe
    //         // on create/post recipe.owner = user._id
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    // },


})

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;

