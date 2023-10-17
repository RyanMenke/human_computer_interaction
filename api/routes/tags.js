const Tag = require("../models/Tag");
const User = require("../models/User");
const router = require("express").Router();

//create tag
router.post("/createTag", async (req, res) => {
    try {
        //generate new user
        const newTag = new Tag({
            tagName: req.body.tagName
        });

        //save user and return response
        const tag = await newTag.save();
        res.status(200).json(tag);
    
    } catch(err) {
        res.status(500).json(err);
    }
});

//update tag
router.put("/:id", async(req, res) => {
        try {
            const tag = await Tag.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            res.status(200).json("Tag has been updated");
        } catch (err) {
            return res.status(500).json(err);
        }
});

//delete tag
router.delete("/:id", async(req, res) => {
    try {
        const tag = await Tag.findByIdAndDelete(req.params.id);
        res.status(200).json("Tag has been deleted");
    } catch (err) {
        return res.status(500).json(err);
    }
});

//get a tag
router.get("/:id", async (req, res) => {
    try {
        const tag = await Tag.findById(req.params.id);
        res.status(200).json(tag);
    } catch(err) {
        res.status(500).json(err);
    }
});

//follow a tag
router.put("/:id/follow", async (req,res) => {
    try {
        const tag = await Tag.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if(!tag.followers.includes(req.body.userId)) {
            await tag.updateOne({$push:{followers:req.body.userId}});
            await currentUser.updateOne({$push:{followingTags:req.params.id}});
            res.status(200).json("Tag followed");
        } else {
            res.status(403).json("You already follow this tag!");
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

//unfollow a tag
router.put("/:id/unfollow", async (req,res) => {
    try {
        const tag = await Tag.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if(tag.followers.includes(req.body.userId)) {
            await tag.updateOne({$pull:{followers:req.body.userId}});
            await currentUser.updateOne({$pull:{followingTags:req.params.id}});
            res.status(200).json("Tag unfollowed");
        } else {
            res.status(403).json("You already do not follow tag!");
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;