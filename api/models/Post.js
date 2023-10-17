const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        max: 1000, 
    },
    image: {
        type: String,
        default:""
    },
    likes: {
        type: Array,
        default: []
    },
    tags: {
        type: Array,
        default: []
    }
},
    {timestamps: true}
);

module.exports = mongoose.model("Post", PostSchema);