const express = require("express");
const router = express.Router();
const Guest = require('../../models/Guest');
const bcrypt = require("bcryptjs");
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const passport = require("passport");

// const validateGuestNameInput = require('../../validation/guests');

router.get("/test", (req, res) => res.json({ msg: "This is the guests route" }));

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.guest.id,
    name: req.guest.name,
    email: req.guest.email
  });
})

//fetch all guests
router.get("/", (req, res) => {
  Guest
    .find()
    .then(guests => res.json(guests))
    .catch(err => res.status(400).json(err));
});


//create a guest
router.post("/register", (req, res) => {

  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let email = "";
  let password = "";
  for (let i = 0; i < 15; i++) {
    email += chars[Math.floor(Math.random() * chars.length)];
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  email += '@choosy.com';

  const newGuest = new Guest({
    name: 'Guest',
    email,
    password
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newGuest.password, salt, (err, hash) => {
      if (err) throw err;
      newGuest.password = hash;
      newGuest
        .save()
        .then(guest => {
          const payload = { id: guest.id, name: guest.name };

          jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600}, (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          });
        })
        .catch(err => console.log(err));
    });
  });
});

router.post("/login", (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  Guest.findOne({ email }).then(guest => {
    if (!guest) {
      return res.status(404).json("This user does not exist");
    }

    bcrypt.compare(password, guest.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: guest.id, name: guest.name };

        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            sucess: true,
            token: "Bearer " + token
          });
        });
      } else {
        return res.status(400).json(errors);
      }
    });
  });
});


module.exports = router;

//fetch a single guest by id
// router.get("/:id", (req, res) => {
//   Guest
//     .findById(req.params.id)
//     .then(guest => res.json(guest))
//     .catch(err => res.status(400).json({ noguestfound: "This guest does not exist"}));
// });


// delete a guest by id
// router.delete("/:id", (req, res) => {
//   Guest
//     .findByIdAndDelete(req.params.id)
//     .then(guest => res.json(guest))
//     .catch(err => res.status(400).json(err));
// });

