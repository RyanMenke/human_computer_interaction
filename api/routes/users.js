const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//update user
router.put("/:id", async(req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        if(req.body.password) {
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch(err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can update only your own account!");
    }
});

//delete user
router.delete("/:id", async(req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been delted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can delete only your own account!");
    }
});

//get a user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, updatedAt, ...other} = user._doc;
        res.status(200).json(other);
    } catch(err) {
        res.status(500).json(err);
    }

});

/* Moved to tags route
const Tag = require("../models/Tag");

//follow a tag
router.put("/follow/:tagId", async (req,res) => {
    try {
        const tag = await Tag.findById(req.params.tagId);
        const currentUser = await User.findById(req.body.userId);
        if(!tag.followers.includes(req.body.userId)) {
            await tag.updateOne({$push:{followers:req.body.userId}});
            await currentUser.updateOne({$push:{followingTags:req.params.tagId}});
            res.status(200).json("Tag followed");
        } else {
            res.status(403).json("You already follow this tag!");
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

//unfollow a tag
router.put("/unfollow/:tagId", async (req,res) => {
    try {
        const tag = await Tag.findById(req.params.tagId);
        const currentUser = await User.findById(req.body.userId);
        if(tag.followers.includes(req.body.userId)) {
            await tag.updateOne({$pull:{followers:req.body.userId}});
            await currentUser.updateOne({$pull:{followingTags:req.params.tagId}});
            res.status(200).json("Tag unfollowed");
        } else {
            res.status(403).json("You already do not follow tag!");
        }
    } catch(err) {
        res.status(500).json(err);
    }
});
*/

module.exports = router;