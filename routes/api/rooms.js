const express = require("express");
const router = express.Router();
const passport = require("passport"); // Post action required passport
const validateRoomCode = require("../../validation/rooms");
const Room = require('../../models/Room');

//GET route. Fetch all rooms.
router.get("/", (req, res) =>{
  Room
    .find()
    .then(rooms => res.json(rooms))
    .catch(err => res.status(400).json(err));
});

//GET route. Fetch by code
router.get("/code/:code", (req, res) => {
  const { errors, isValid } = validateRoomCode(req.params);

  if (!isValid) return res.status(400).json(errors);

  Room
    .findOne({ code: req.params.code })
    .then(room => {
      if (!room) {
        errors.code = "Room code is invalid!";
        return res.status(400).json(errors);
      } else {
        return res.json(room);
      }
    })
});

// room GET route. Fetches the room with the id.
router.get("/:id", (req, res) => {
  Room
    .findById(req.params.id)
    .then(room => res.json(room))
    .catch(err => res.status(400).json({ noroomfound: "Please enter a room code!"}));

});

//room POST route. A user can create a room if they are signed in
router.post("/", 
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let RANDOM_CODE = (Math.random() * 9876543210).toString().slice(0, 6);

    const ALL_CODES = [];
    Room.find().then(res => {
      res.forEach(room => ALL_CODES.push(room.code));
    })

    while (ALL_CODES.includes(RANDOM_CODE)) {
      RANDOM_CODE = (Math.random() * 9876543210).toString().slice(0, 6);
    }
    
    const newRoom = new Room({
      host: req.user.id,
      code: RANDOM_CODE
    })

    newRoom.save()
      .then(room => res.json(room));
})

router.patch("/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    Room
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(room => res.json(room))
      .catch(err => res.status(400).json(err));
  }
);

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
