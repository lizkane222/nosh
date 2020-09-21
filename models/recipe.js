const mongoose = require("mongoose");


// Schema("template", optional configuration obj)
const recipeSchema = new mongoose.Schema({
    recipeName: {type: String, required: true},
    // quantity value should be set to 1, unit value should be set to foodItems.name+"s"
    foodItems: [
        {
            name: {type: String, required: true},
            quantity: {type: Number, required: true},
            unit: {type: String, required: true},
            calories: {type: Number, required: true}
        },
    ],
    //narrative Description are the recipe's exact instructions, NOT owner's thoughts about dish which will be at tag.text
    narrativeDescription: {type: String, required: true},
    // if outside source exists provide it, if source does not exist not required
    source: {type: String, required: false},
    // serving size per recipe
    servesPeople: {type: Number, required: true},
    // must provide numHours, hours is already filled in NO Option to choose,
    // must provide numMinutes, minutes is already filled in NO Option to choose,
    cookTime: [
        {numHours: {type: Number, required: true}},
        {hours: {type: String, required: true}},
        {numMinutes: {type: Number, required: true}},
        {minutes: {type: String, required: true}}
    ],
    // restrict to available options ("beginner", "intermediate", "expert" )
    skillLevel: {type: String, required: true},
    // totalCalories is a function that sums foodItem.calories
    totalCalories: {type: Number, required: true},
    // each recipe should have a tag per foodItem, 
    tag: [
        {
            name: {type:String, required: true},
            count: {type: Number, required: true},
            text: {type: String, required: true},
        },
    ],
    user: [{
    // reference
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },],
    // the creator the recipe is the owner, the user._id is the value
    // owner gets transferred to Team-Nosh-Admin-User when owner deletes recipe
    owner: {type: String, required: true},
})

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;