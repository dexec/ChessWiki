const express = require("express");
const router = express.Router();
const positions = require("../models/positions");

router.get("/", function (req, res) {
    res.render("homepage");
});

router.get("/positions", function (req, res) {
    res.render("listpositions", {positions: positions.slice(0, 4)});
});

router.get("/positions/position1", function (req, res) {
    res.render("position", {position: positions[0]});
});

router.get("/positions/position2", function (req, res) {
    res.render("position", {position: positions[1]});
});

router.get("/positions/position3", function (req, res) {
    res.render("position", {position: positions[2]});
});

router.get("/openings", function (req, res) {
    res.render("listopenings");
});

module.exports = router;