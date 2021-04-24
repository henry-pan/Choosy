const express = require("express");
const router = express.Router();
const passport = require("passport");
const Idea = require("../../models/Idea")
const validateIdeaInput = require("../../validation/ideas")

router.get("/test", (req, res) => res.json({ msg: "This is the ideas route" }));

// gets all ideas (unauthenticated)
router.get("/", (req, res) => {
  Idea
    .find()
    .then(ideas => res.json(ideas))
    .catch(err => res.status(400).json(err));
});


// gets all the ideas by a given user
// todo: nest this under room route later?
router.get("/user/:user_id", (req, res) => { // note the :user_id wildcard
  Idea
    .find({ user: req.params.user_id })
    .then(ideas => res.json(ideas))
    .catch(err => res.status(400).json(err));
});


// gets a specific idea by its id
router.get("/:id", (req, res) => {
  Idea
    .findById(req.params.id)
    .then(idea => res.json(idea))
    .catch(err => res.status(400).json(err));
})


// TESTED
// Idea post route
// todo: refactor to allow non-signed-in users to post ideas.
// todo: make a new auth'd route that only lets users post to their own ideas
router.post("/",
  passport.authenticate("jwt", { session: false }), 
  (req, res) => {
    const { isValid, errors } = validateIdeaInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    };

    const newIdea = new Idea({
      user: req.user.id,
      body: req.body.body
    })

    newIdea.save()
      .then(idea => res.json(idea));
  });

// Idea update route
// may have to refactor to allow non-signed-in users to post ideas.
// Todo: test to make sure users can only update ideas if logged in
router.patch("/:id",
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
router.delete("/:id", 
  passport.authenticate("jwt", { session: false }), 
  (req, res) => {
    Idea
      .findByIdAndDelete(req.params.id)
      .then(idea => res.json(idea))
      .catch(err => res.status(400).json(err));
  });

module.exports = router;