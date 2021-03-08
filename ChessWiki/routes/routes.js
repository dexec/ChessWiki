const express = require("express");
const router = express.Router();
const positions = require("../models/positions");
const positionOfTheDay = positions[1];

router.get("/", function (req, res) {
    res.render("homepage", {positionOfTheDay: positionOfTheDay});
});

router.get("/positions", function (req, res) {
    res.render("listpositions", {positions: positions.slice(0, 4), positionOfTheDay: positionOfTheDay});
});

router.get("/positions/position1", function (req, res) {
    res.render("position", {position: positions[0], positionOfTheDay: positionOfTheDay});
});

router.get("/positions/position2", function (req, res) {
    res.render("position", {position: positions[1], positionOfTheDay: positionOfTheDay});
});

router.get("/positions/position3", function (req, res) {
    res.render("position", {position: positions[2], positionOfTheDay: positionOfTheDay});
});

router.get("/positions/position4", function (req, res) {
    res.render("position", {position: positions[3], positionOfTheDay: positionOfTheDay});
});

router.get("/openings", function (req, res) {
    res.render("listopenings", {positionOfTheDay: positionOfTheDay});
});

router.get("/formposition", function(req,res) {
    res.render("formposition",{positionOfTheDay: positionOfTheDay})
});

router.use(function(req, res) {
    res.render("404");
});

module.exports = router;
