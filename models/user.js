const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    // TODO  REFACTOR for now had to make these not required and not unique to get 
    email: { type: String, },
    password: { type: String },
    // this is a person chosen recipes (ref recipe ._id) not required, it is  similar to author/articles in example
    nosh: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe" },
    ],
    // this is a persons pantry, it is not required, but of they choose they can add food item objects to db
    pantry: [{
        foodItem: { type: String },
        quantity: { type: Number },
        unit: { type: String },
    }],
    // placeholder for a persons own recipes this will be same as nosh above so that when a user creates a recipes we up data recipes here
    // recipes: { type: String }, 

}, { timestamps: true });

const User = mongoose.model('User', userSchema)

module.exports = User;