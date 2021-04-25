const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const passport = require("passport"); // Post action required passport
const Room = require('../../models/Room');
const Idea = require("../../models/Idea");
const ideas = require('./ideas');

const express = require("express");
const router = express.Router();
const passport = require("passport");
const Idea = require("../../models/Idea")
const validateIdeaInput = require("../../validation/ideas")

ideaRouter.get("/test", (req, res) => res.json({ msg: "This is the ideas route" }));

// gets all ideas (unauthenticated)
ideaRouter.get("/", (req, res) => {
  Idea
    .find()
    .then(ideas => res.json(ideas))
    .catch(err => res.status(400).json(err));
});


// gets all the ideas by a given user
// todo: nest this under room route later?
ideaRouter.get("/user/:user_id", (req, res) => { // note the :user_id wildcard
  Idea
    .find({ user: req.params.user_id })
    .then(ideas => res.json(ideas))
    .catch(err => res.status(400).json(err));
});

// gets all the ideas by a given room
ideaRouter.get("/room/:room_id", (req, res) => {
  Idea
    .find({ room: req.params.room_id })
    .then(ideas => res.json(ideas))
    .catch(err => res.status(400).json(err));
});


// gets a specific idea by its id
ideaRouter.get("/:id", (req, res) => {
  Idea
    .findById(req.params.id)
    .then(idea => res.json(idea))
    .catch(err => res.status(400).json(err));
})


// TESTED
// Idea post route
// todo: refactor to allow non-signed-in users to post ideas.
// todo: make a new auth'd route that only lets users post to their own ideas
ideaRouter.post("/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateIdeaInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    };

    const newIdea = new Idea({
      user: req.user.id || null,
      room: req.room.id,
      body: req.body.body
    })

    newIdea.save()
      .then(idea => res.json(idea));
  });

// Idea update route
// may have to refactor to allow non-signed-in users to post ideas.
// Todo: test to make sure users can only update ideas if logged in
ideaRouter.patch("/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    const { isValid, errors } = validateIdeaInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    };

    Idea
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(idea => res.json(idea))
      .catch(err => res.status(400).json(err));
  }
);

// Delete idea by id
// Todo: test to make sure users can only delete ideas if logged in
// todo: refactor to not require auth
ideaRouter.delete("/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Idea
      .findByIdAndDelete(req.params.id)
      .then(idea => res.json(idea))
      .catch(err => res.status(400).json(err));
  });

module.exports = ideaRouter;

// *** ROOMS ***

roomRouter.use("/:id/ideas", ideas);

roomRouter.get("/test", (req, res) => {
  res.json({
    msg: "This is the rooms route"
  });
});

//GET route. Fetch all rooms.
roomRouter.get("/", (req, res) => {
  Room
    .find()
    .then(rooms => res.json(rooms))
    .catch(err => res.status(400).json(err));
});

//GET route. Fetch all users in a room
roomRouter.get("/:id/users", (req, res) => {
  // WRITE CODE HERE
  User
    .find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json(err));
});


//Get route. Fetch all ideas in a room
roomRouter.get("/:id/ideas", (req, res) => {
  // WRITE CODE HERE
});

// room GET route. Fetches the room with the id.
roomRouter.get("/:id", (req, res) => {
  Room
    .findById(req.params.id)
    .then(room => res.json(room))
    .catch(err => res.status(400).json({ noroomfound: "This room does not exist" }));
});



//room POST route. A user can create a room if they are signed in
roomRouter.post("/",
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
roomRouter.delete("/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Room
      .findByIdAndDelete(req.params.id)
      .then(room => res.json(room))
      .catch(err => res.status(400).json(err));
  }
);


module.exports = roomRouter;