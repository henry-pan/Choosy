const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require("bcryptjs");
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken'); // does not end up in the final version
const passport = require("passport"); // Post action required passport
const validateRoomInput = require("../../validation/ideas");
const Room = require('../../models/Room');

router.get("/test", (req, res) => {
  res.json({
    msg: "This is the rooms route"
  });
});

// Generate GET route for fetching  a room based on the access code
// POST route for making a new room
// DELETE route for closing a room

// router.get("/:id", (req, res) => {
//   const { errors, isValid } = validateRoomInput(req.code);

//   Room.findOne({ code: req.body.code })
//     .then(room => {
//       if (!room) {
//         errors.
//       }
//     })
//     .find()
//     .then(rooms => res.json(rooms))
//     .catch(err => res.status(400).json(err))
// });

router.post("/", 
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const RANDOM_CODE = (Math.random() * 9876543210).toString().slice(0, 6);
    const newRoom = new Room({
      owner: req.user.id,
      code: RANDOM_CODE
    })

    newRoom.save()
      .then(room => res.json(room));
})

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
