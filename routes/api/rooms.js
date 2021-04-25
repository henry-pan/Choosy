const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require("bcryptjs");
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken'); // does not end up in the final version
const passport = require("passport"); // Post action required passport
const validateRoomCode = require("../../validation/ideas");
const Room = require('../../models/Room');
const Idea = require("../../models/Idea");
const { json } = require("body-parser");
// const ideas = require('./ideas'); 

// router.use("/:id/ideas", ideas);

router.get("/test", (req, res) => {
  res.json({
    msg: "This is the rooms route"
  });
});

//GET route. Fetch all rooms.
router.get("/", (req, res) =>{
  Room
    .find({code: req.body.code})
    .then(rooms => res.json(rooms))
    .catch(err => res.status(400).json(err));
});

// room GET route. Fetches the room with the id.
router.get("/:id", (req, res) => {
  Room
    .findById(req.params.id)
    .then(room => res.json(room))
    .catch(err => res.status(400).json({ noroomfound: "This room does not exist"}));
});
  
// room GET route. Fetches a room by its code.
router.get("/", (req, res) => {
  Room
    .find()
    .then(rooms => res.json(rooms))
    .catch(err => res.status(400).json(err));
});

//room POST route. A user can create a room if they are signed in
router.post("/", 
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const RANDOM_CODE = (Math.random() * 9876543210).toString().slice(0, 6);
    const newRoom = new Room({
      host: req.user.id,
      code: RANDOM_CODE
    })

    
    newRoom.save()
      .then(room => res.json(room));
})
// I think this lets any signed-in user delete a room
//room DELETE route. Only the owner can delete the room
router.delete("/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Room
      .findByIdAndDelete(req.params.id)
      .then(room => res.json(room))
      .catch(err => res.status(400).json(err));
  }
);


module.exports = router;
