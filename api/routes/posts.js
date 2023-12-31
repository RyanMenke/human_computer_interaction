const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Tag = require("../models/Tag");

//create a post
router.post("/", async (req,res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch(err) {
        res.status(500).json(err);
    }
});

//update a post
router.put("/:id", async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId) {
            await post.updateOne({$set:req.body});
            res.status(200).json("The post has been updated");
        } else {
            res.status(403).json("You can only update your own post");
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

//delete a post
router.delete("/:id", async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("The post has been deleted");
        } else {
            res.status(403).json("You can only delete your own post");
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

//like/dislike a post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)) {
            await post.updateOne({$push: {likes: req.body.userId}});
            res.status(200).json("The post has been liked!");
        } else {
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json("The post has been disliked!");
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

//get a post
router.get("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch(err) {
        res.status(500).json(err);
    }
});


//get feed posts
router.get("/feed/all", async(req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId);
        //const userPosts = await Post.find({userId: currentUser._id});
        const tagPosts = await Promise.all(
            currentUser.followingTags.map(tagId => {
                return Post.find({tags: tagId});
            })
        );
        
        //res.status(200).json(userPosts.concat(...tagPosts));
       res.status(200).json(tagPosts);
    } catch(err) {
        res.status(500).json(err);
    }
})

router.get("/all/posts", async(req, res) => {
    try {
        const posts = await Post.find();

        //res.status(200).json(userPosts.concat(...tagPosts));
        res.status(200).json(posts);
    } catch(err) {
        res.status(500).json(err);
    }
})

router.put('/create/post', async (req, res) => {
    try {
        // const { name, email } = req.body;
        // const newUser = new User({ name, email });
        // const savedUser = await newUser.save();

        const content = req.body.content
        const postToBeCreated = new Post({
            content: content,
        })
        const savedUser = await postToBeCreated.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

module.exports = router;