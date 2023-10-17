const mongoose = require("mongoose")

const TagSchema = new mongoose.Schema({
    tagName: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true
    },
    tagPicture: {
        type: String,
        default:""
    },
    followers: {
        type: Array,
        default: []
    },
    desc: {
        type: String,
        max: 300
    }
},
{timestamps: true}
);

module.exports = mongoose.model("Tag", TagSchema);