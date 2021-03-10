const dataPosition = require("./positions");

function Opening(ecoCat, ecoSubcat, parent, name, variations, moves, desc) {

    this.ecoCat = ecoCat;
    this.ecoSubcat = ecoSubcat;
    this.parent = parent;
    this.name = name;
    this.moves = moves;
    this.desc = desc;

    this.eco = function() {
        return ecoCat + ecoSubcat;
    };

    this.getName = function () {
        return name;
    }

    this.getDesc = function () {
        return desc;
    }

    this.getParent = function () {
        return parent;
    }

    this.getMoves = function () {
        return moves;
    }

    this.getVariations = function () {
        return variations;
    }

    this.convertToPosition = function (num) {
        let pos = "rnbqkbnr/pppppppp/eeeeeeee/eeeeeeee/eeeeeeee/eeeeeeee/PPPPPPPP/RNBQKBNR";
        let castl = "KQkq";

        // 'num' (Anzahl der Züge) ist optional, wenn keine Angabe erfolgt wird die gesamte Eröffnung bzw. ihre Länge genommen
        num = (typeof num === "undefined") ? moves.length : num;

        for(let i = 0; i < num; i++) {
            let move = moves[i];
            if(i % 2 === 0) { // Weiß am Zug
                if(castl.includes("K" && move.match(/^[O0o]-[O0o]$/))) {

                }
            } else if(i % 2 === 1) { // Schwarz am Zug

            }
        }

        // 'col' (Spieler am Zug) wird anhängig von der Anzahl der in unserem Fall halben Züge definiert
        const col = (num % 2 === 0) ? "w" : "b";

        return new dataPosition.Position(pos, col, castl, num);
    }
}

const openings = [
    new Opening("C", 45, "Königsspringerspiel", "Schottische Partie",  ["Hauptvariante", "Schmidt-Variante", "Schottisches Gambit"], ["e2-e4","e7-e5","Ng1-f3","Nb8-c6","d2-d4"], "Die Schottische Partie ist eine offene Eröffnung und entwickelt sich aus dem Königsspringerspiel, manchmal auch aus dem Mittelgambit. Die Eröffnung hat neben ihrer Hauptvariante nur wenige Nebenvarianten und Gambits, weswegen man die Theorie schnell erlernen kann und die Eröffnung nur in ECO-Nummer C45 vorzufinden ist.")
]

module.exports = {
    openings: openings,
    Opening: Opening
}
