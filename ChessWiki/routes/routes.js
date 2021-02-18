const express = require("express");
const router = express.Router();
const positions = require("../models/positions");

router.get("listpositions.ejs", function (req, res) {
    res.render("listpositions", {positions: positions})
});