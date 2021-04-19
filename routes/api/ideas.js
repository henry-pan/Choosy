const express = require("express");
const router = express.Router();
const passport = require("passport");
const Idea = require("../../models/Idea")
const validateIdeaInput = require("../../validation/ideas")

router.get("/test", (req, res) => res.json({ msg: "This is the ideas route" }));

// did not add password.authenticate because it doesn't matter whether a user is logged in or not
// gets all ideas
// TESTED
router.get("/", (req, res) => {
  Idea
    .find()
    .then(ideas => res.json(ideas))
    .catch(err => res.status(400).json(err));
});


// gets all the ideas by a given user
// nest this under room route later?
// TESTED
router.get("/user/:user_id", (req, res) => { // note the :user_id wildcard
  Idea
    .find({ user: req.params.user_id })
    .then(ideas => res.json(ideas))
    .catch(err => res.status(400).json(err));
});


// TESTED
// gets a specific idea by its id
router.get("/:id", (req, res) => {
  Idea
    .findById(req.params.id)
    .then(idea => res.json(idea))
    .catch(err => res.status(400).json(err));
})


// TESTED
// Idea post route
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
router.patch("/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const ideaBody = req.body.body;

    const { isValid, errors } = validateIdeaInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    };

    Idea
      .findById(req.params.id)
      .update({'body': ideaBody})
      .then(idea => res.json(idea))
      .catch(err => res.status(400).json(err));
  }
);

// Delete idea by id (not currently restricted to a user)
router.delete("/:id", 
  passport.authenticate("jwt", { session: false }), 
  (req, res) => {
    Idea
      .findById(req.params.id)
      .remove()
      .then(idea => res.json(idea)) // dunno what to put here
  });

module.exports = router;