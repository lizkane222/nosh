const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true},
    password: {type: String, required: true },
    // this is a person chosen recipes (ref recipe ._id) not required, it is  simlar to author/articles in example
    nosh: [
        { type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe" }
    ],
    // this is a persons pantry, it is not required, but of they choose they can add food item objects to db
    pantry: {
        foodItem: { type: String },
        quantity: { type: Number },
        unit: { type: String },
    },
    // placeholder for a persons own recipies this will be same as nosh above so that wehn a user creates a recipies we up date recipes here
    // recipes: { type: String },

}, { timestamps: true });

const User = mongoose.model('User', userSchema)

module.exports = User;