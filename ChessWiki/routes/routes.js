const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const openings = require("../models/openings");
const dataPositions = require("../models/positions");
const positionsForPosition = dataPositions.positionsForPosition;
const positionOfTheDay = positionsForPosition[1];
router.use(bodyParser.urlencoded({extended: false}));

function positionRender() {
    router.get("/positions/position:id", function (req, res) {
        res.render("position", {position: positionsForPosition[req.params.id], positionOfTheDay: positionOfTheDay});
    });
}

router.post("/formposition", function (req, res) {
    positionString = req.body.row8 + "/" + req.body.row7 + "/" + req.body.row6 + "/" + req.body.row5 + "/" + req.body.row4 + "/" + req.body.row3 + "/" + req.body.row2 + "/" + req.body.row1;
    activeColor = req.body.activeColor;
    castlingAvailability = req.body.castlingAvailability;
    numberOfMoves = req.body.numberOfMoves;
    positionsForPosition.push(new dataPositions.Position(positionString, activeColor, castlingAvailability, numberOfMoves));
    /*res.render("position", {
        position: positionsForPosition[positionsForPosition.length - 1],
        positionOfTheDay: positionOfTheDay
    });*/
    positionRender();
    res.redirect("/positions");
})

router.get("/", function (req, res) {
    res.render("homepage", {positionOfTheDay: positionOfTheDay});
});

router.get("/positions", function (req, res) {
    res.render("listpositions", {positions: positionsForPosition, positionOfTheDay: positionOfTheDay});
});

positionRender();

router.get("/openings", function (req, res) {
    res.render("listopenings", {positionOfTheDay: positionOfTheDay});
});

router.get("/formposition", function (req, res) {
    res.render("formposition", {positionOfTheDay: positionOfTheDay})
});

router.get("/openings/schottische_partie", function (req, res) {
    res.render("opening", {opening: openings[0], positionOfTheDay: positionOfTheDay});
});

router.use(function (req, res) {
    res.render("404");
});

module.exports = router;
