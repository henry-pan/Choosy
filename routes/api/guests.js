const express = require("express");
const router = express.Router();
const Guest = require('../../models/Guest');
const validateGuestName = require('../../validation/guests');

router.get("/test", (req, res) => res.json({ msg: "This is the guests route" }));


module.exports = router;