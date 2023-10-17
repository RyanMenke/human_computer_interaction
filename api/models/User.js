const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        require: true,
        max: 50, 
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    profilePicture: {
        type: String,
        default:""
    },
    followingTags: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    bio: {
        type: String,
        max: 300
    }
},
{timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);