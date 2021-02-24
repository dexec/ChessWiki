const express = require("express");
const router = express.Router();
const positions = require("../models/positions");

router.get("/", function (req, res) {
    res.render("choose");
});

router.get("/listpositions", function (req, res) {
    res.render("listpositions", {positions: positions.slice(0, 4)});
});
router.get("/listpositions/position1", function (req, res) {
    res.render("position", {positions: positions[0]});
});
router.get("/listpositions/position2", function (req, res) {
    res.render("position", {positions: positions[1]});
});
router.get("/listpositions/position3", function (req, res) {
    res.render("position", {positions: positions[2]});
});

router.get("/listofopenings", function (req, res) {
    res.render("listofopenings");
});

module.exports = router;