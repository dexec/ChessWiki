/*Bearbeitet von Alexander Gromov und Daniel Ackermann*/

/*Anfang Alexander Gromov*/
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

/*Einbinden der "Fake-Datenbanken"*/
const dataOpenings = require("../models/openings");
const openings = dataOpenings.openings;
const dataPositions = require("../models/positions");
const positions = dataPositions.positions;

/*Die Stellung für das aside*/
const positionOfTheDay = positions[1];

router.use(bodyParser.urlencoded({extended: false}));



router.get("/", function (req, res) {
    res.render("homepage", {positionOfTheDay: positionOfTheDay});
});

router.get("/openings/analyse/:id", function (req, res) {
    let index = req.params.id.lastIndexOf("_move");
    let openingName = req.params.id.substring(0, index);
    let moveNumber = req.params.id.substr(index + 5);
    const newPosition = openings.filter(opening => opening.convertNameToURL() === openingName)[0].convertToPosition(parseInt(moveNumber));
    res.render("position", {position: newPosition, positionOfTheDay: positionOfTheDay});
});

router.get("/openings/:name", function (req, res) {
    for (let opening of openings) {
        if (req.params.name === opening.convertNameToURL()) {
            res.render("opening", {opening: opening, positionOfTheDay: positionOfTheDay});
        }
    }
});

router.get("/openings/:name/:subname", function (req, res) {
    for (let opening of openings) {
        if ((req.params.name === opening.convertParentToURL() && req.params.subname === opening.convertNameToURL())) {
            res.render("opening", {opening: opening, positionOfTheDay: positionOfTheDay});
        }
    }
});

router.get("/openings", function (req, res) {
    res.render("listopenings", {openings: openings, positionOfTheDay: positionOfTheDay});
});

router.get("/formopening", function (req, res) {
    res.render("formopening", {positionOfTheDay: positionOfTheDay})
});

router.post("/formopening", function (req, res) {
    const ecoCat = req.body.ecoCat;
    const ecoSubcat = parseInt(req.body.ecoSubcat);
    const parent = req.body.parentOpening;

    /* Einfache Lösung zur Vermeidung von Duplikaten (da URL vom Namen abhängt, könnte bei gleichnamigen Eröffnungen ein Fehler auftreten)
    Um einen Fehlerfall im Extremfall zu vermeiden (zum Beispiel wenn im Array "Test (1)" und später "Test" exisitieren,
    würde die Eröffnung "Test" in "Test (1)" ohne weitere Prüfung umbenannt werden), kann eine vom Nutzer eingegebene Eröffnung nicht mit ")" enden. */
    let antiDuplicates = 1, name = req.body.nameOpening;
    for (let opening of openings) {
        if (opening.name === name) {
            name = req.body.nameOpening + " (" + antiDuplicates++ + ")";
        }
    }

    /* Der kommaseparierte Eintrag von Variationen wird hier entsprechend bearbeitet und gefilterte Variationen/Fortsetzungen werden ins Array gepusht */
    let index, variations = [], variationsString = req.body.variations;
    if (variationsString !== "") {
        while ((index = variationsString.indexOf(",")) !== -1) {
            variations.push(variationsString.substring(0, index));
            variationsString = variationsString.substring(index + 1);
        }
        variations.push(variationsString);
    }

    /* Das Formular übergibt ein Array mit allen angegebenen Zügen, die Größe des Arrays ist abhängig von der Anzahl der angezeigten Eingabefelder für Züge.
    Da man Felder leer lassen kann, muss man diese leeren Felder filtern. Sobald ein leeres Feld entdeckt wird, wird moves auf bis zu diesem Index reduziert und die Schleife verlassen.
    Das eliminiert auch das Problem, wenn man zwischen zwei beschriebenen Eingabefeldern leere Eingabefelder lässt. */
    let moves = req.body.moves;
    for (let i = 0; i < moves.length; i++) {
        if (moves[i] === "") {
            moves = moves.slice(0, i);
        }
    }

    const desc = req.body.desc;
    openings.push(new dataOpenings.Opening(ecoCat, ecoSubcat, parent, name, variations, moves, desc));
    res.redirect("/openings");
});
/*Ende Alexander Gromov*/

/*Anfang Daniel Ackermann*/
router.get("/positions", function (req, res) {
    res.render("listpositions", {positions: positions, positionOfTheDay: positionOfTheDay});
});

router.get("/positions/analyse/position:id", function (req, res) {
    req.params.id > positions.length - 1 ? res.render("404") :
        res.render("position", {position: positions[req.params.id], positionOfTheDay: positionOfTheDay});
});

router.get("/formposition", function (req, res) {
    res.render("formposition", {positionOfTheDay: positionOfTheDay})
});

router.post("/formposition", function (req, res) {
    const positionString = req.body.row8 + "/" + req.body.row7 + "/" + req.body.row6 + "/" + req.body.row5 + "/" + req.body.row4 + "/" + req.body.row3 + "/" + req.body.row2 + "/" + req.body.row1;
    const activeColor = req.body.activeColor;
    const castlingAvailability = req.body.castlingAvailability;
    const numberOfMoves = parseInt(req.body.numberOfMoves);
    positions.push(new dataPositions.Position(positionString, activeColor, castlingAvailability, numberOfMoves));
    res.redirect("/positions");
});

router.get("/documentation", function (req, res) {
    res.render("../../doc/documentation", {positionOfTheDay: positionOfTheDay});
});

router.use(function (req, res) {
    res.render("404");
});

module.exports = router;
/*Ende Daniel Ackermann*/
