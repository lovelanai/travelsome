const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Post = require("../models/Post.models");
const User = require("../models/User.models");
const cookieSession = require("cookie-session");
const { ObjectId } = require("mongodb");


// theft proof cookie
// COOKIE SESSION
router.use(
  cookieSession({
    secret: "aVeryS3cr3tK3y",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: false,
    secure: false,
  })
);

// Hämtar alla recensioner
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const userPosts = await Post.find({});
    res.send(userPosts);
  })
);

// Skapa ny recension
router.post(
  "/",
  asyncHandler(async (req, res) => {
    
    const { title, description } = req.body;
    const postedBy = req.session.username;
    const id = req.params.id
    const { _id } = ObjectId(id)

    if (!title || !description) {
      res.status(400);
      throw new Error("fyll i alla fält");
    } else {
      const post = new Post({
        title,
        description,
        postedBy,
        id,
      });

      const createdPost = await post.save();
      res.status(201).json(createdPost);
    }
  })
);

//  Hämtar alla recensioner skrivna av inloggad användare
router.get("/postedBy", asyncHandler(async (req, res) =>{
      const postedBy = req.session.username;
      const userPosts = await Post.find({ postedBy });
      res.send(userPosts);
      return
}))

 //Ska hämta resencion by id
      router.get("/:id", asyncHandler(async (req, res) => {
         const { id } = req.params;
        const currentPost = await Post.findById(id)
   
         if (!currentPost) {
           res.status(201).json("No post with this id does exist");
           return
         } else{
           res.status(201).json(currentPost);
         }
      }))

 router.put("/:id", asyncHandler( async (req, res) => {
  const { id } = req.params;
      const newPost = await Post.findByIdAndUpdate(id, req.body);
      if(!newPost){
        res.json("No post with this id does exist")
           return
      }  else{
           res.json(newPost)
         }
 }))


// Låter användare ta bort sina recensioner
router.delete("/:id", asyncHandler(async (req, res) =>{
     const { id } = req.params;
      const userPosts = await Post.findByIdAndRemove(id);
      if (!userPosts) {
      res.status(400).json("Id inte hittat");
      return;
    }
      res.status(200).json(userPosts);
}))

module.exports = router;
