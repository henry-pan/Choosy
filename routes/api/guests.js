const express = require("express");
const router = express.Router();
const Guest = require('../../models/Guest');
const validateGuestNameInput = require('../../validation/guests');
const { json } = require('body-parser');
const mongoose = require("mongoose");

router.get("/test", (req, res) => res.json({ msg: "This is the guests route" }));

//fetch all guests
router.get("/", (req, res) => {
  debugger
  Guest
    .find()
    .then(guests => res.json(guests))
    .catch(err => res.status(400).json(err));
});

//fetch a single guest by id
router.get("/:id", (req, res) => {
  Guest
    .findById(req.params.id)
    .then(guest => res.json(guest))
    .catch(err => res.status(400).json({ noguestfound: "This guest does not exist"}));
});

//create a guest
router.post("/", (req, res) => {
  // const { errors, isValid } = validateGuestNameInput(req.name);

  // if (!isValid) {
  //   return res.status(json(errors));
  // }

  const newGuest = new Guest({
    name: req.body.name
  });

  newGuest
    .save()
    .then(guest => res.json(guest));
});

//delete a guest by id
router.delete("/:id", (req, res) => {
  Guest
    .findByIdAndDelete(req.params.id)
    .then(guest => res.json(guest))
    .catch(err => res.status(400).json(err));
});

module.exports = router;