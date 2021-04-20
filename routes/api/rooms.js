const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require("bcryptjs");
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken'); // does not end up in the final version
const passport = require("passport"); // Post action required passport

router.get("/test", (req, res) => {
  res.json({
    msg: "This is the rooms route"
  });
});

// Generate GET route for fetching  a room based on the access code
// POST route for making a new room
// DELETE route for closing a room


