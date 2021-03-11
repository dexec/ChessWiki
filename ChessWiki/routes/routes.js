const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const dataOpenings = require("../models/openings");
const openings = dataOpenings.openings;

const dataPositions = require("../models/positions");
const positionsForPosition = dataPositions.positionsForPosition;
const positionOfTheDay = positionsForPosition[1];

router.use(bodyParser.urlencoded({extended: false}));

router.post("/formposition", function (req, res) {
    const positionString = req.body.row8 + "/" + req.body.row7 + "/" + req.body.row6 + "/" + req.body.row5 + "/" + req.body.row4 + "/" + req.body.row3 + "/" + req.body.row2 + "/" + req.body.row1;
    const activeColor = req.body.activeColor;
    const castlingAvailability = req.body.castlingAvailability;
    const numberOfMoves = parseInt(req.body.numberOfMoves);
    positionsForPosition.push(new dataPositions.Position(positionString, activeColor, castlingAvailability, numberOfMoves));
    res.redirect("/positions");
})

router.get("/", function (req, res) {
    res.render("homepage", {positionOfTheDay: positionOfTheDay});
});

router.get("/positions", function (req, res) {
    res.render("listpositions", {positions: positionsForPosition, positionOfTheDay: positionOfTheDay});
});

router.get("/positions/analyse/position:id", function (req, res) {
    req.params.id > positionsForPosition.length - 1 ? res.render("404") :
        res.render("position", {position: positionsForPosition[req.params.id], positionOfTheDay: positionOfTheDay});
});

router.get("/openings/analyse/:id", function (req, res) {
    let openingName = req.params.id.substr(0, req.params.id.length - 1);
    let moveNumber = req.params.id.substring(req.params.id.length - 1);
    const newPosition = openings.filter(opening => opening.convertNameToURL() === openingName)[0].convertToPosition(parseInt(moveNumber));
    res.render("position", {position: newPosition, positionOfTheDay: positionOfTheDay});
});

router.get("/formposition", function (req, res) {
    res.render("formposition", {positionOfTheDay: positionOfTheDay})
});

router.get("/openings", function (req, res) {
    res.render("listopenings", {positionOfTheDay: positionOfTheDay});
});

router.get("/openings/schottische_partie", function (req, res) {
    res.render("opening", {opening: openings[0], positionOfTheDay: positionOfTheDay});
});

router.get("/openings/schottische_partie/:name", function (req, res) {
    for(let i = 0; i < openings.length; i++) {
        if(req.params.name === openings[i].convertNameToURL()) {
            res.render("opening", {opening: openings[i], positionOfTheDay: positionOfTheDay});
        }
    }
});

router.get("/formopening", function (req, res) {
    res.render("formopening", {positionOfTheDay: positionOfTheDay})
});

router.get("/documentation", function (req, res) {
    res.render("../../doc/documentation", {positionOfTheDay: positionOfTheDay});
})

router.use(function (req, res) {
    res.render("404");
});

module.exports = router;
