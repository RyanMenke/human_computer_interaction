const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 1,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        require: false,
        default: "",
        max: 50
    },
    password: {
        type: String,
        required: true,
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