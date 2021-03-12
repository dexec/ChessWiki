//Bearbeitet von Alexander Gromov
//Persistente Datenhaltung der Eröffnungen

//Assoziation zwischen den Fachobjekten Eröffnung und Stellung
const dataPosition = require("./positions");

function Opening(ecoCat, ecoSubcat, parent, name, variations, moves, desc) {

    this.name = name;
    this.desc = desc;
    this.parent = parent;
    this.moves = moves;
    this.variations = variations;

    this.eco = function() {
        return ecoCat + ecoSubcat;
    }

    this.convertNameToURL = function () {
        return this.convertToURL(name);
    }

    this.convertParentToURL = function () {
        return this.convertToURL(parent);
    }

    this.convertToURL = function (str) {
        return str.replace(" ", "_").toLowerCase();
    }

    //Eine Eröffnung nach "num" Zügen wird in ein Position-Object umgewandelt
    this.convertToPosition = function (num) {
        let pos = "rnbqkbnr/pppppppp/eeeeeeee/eeeeeeee/eeeeeeee/eeeeeeee/PPPPPPPP/RNBQKBNR"; // Grundstellung
        let castl = "KQkq"; //Ausgangslage der Rochademöglichkeiten

        // In pos wird an der Stelle index der Inhalt content überschrieben
        function posReplace(index, content) {
            pos = pos.substr(0, index) + content + pos.substr(index + 1);
        }

        // Ein Feld bestehend aus Buchstabe und Zahl wird in ein Index passend zu unserem positionString umgewandelt und zurückgegeben
        function calcIndex(field) {
            let value;
            const letter = field.substr(0, 1);
            const number = parseInt(field.substr(1, 1));

            switch(number) {
                case 1: value = 63; break;
                case 2: value = 54; break;
                case 3: value = 45; break;
                case 4: value = 36; break;
                case 5: value = 27; break;
                case 6: value = 18; break;
                case 7: value = 9; break;
                case 8: value = 0;
            }

            switch(letter) {
                case "b": value += 1; break;
                case "c": value += 2; break;
                case "d": value += 3; break;
                case "e": value += 4; break;
                case "f": value += 5; break;
                case "g": value += 6; break;
                case "h": value += 7; break;
            }

            return value;
        }

        // 'num' (Anzahl der Züge) ist optional, wenn keine Angabe erfolgt wird die gesamte Eröffnung bzw. ihre Länge genommen
        num = (typeof num === "undefined") ? moves.length : num;

        for(let i = 0; i < num; i++) {
            let move = moves[i];
            if(i % 2 === 0) { // Weiß am Zug
                if(castl.includes("K") && move.match(/^[O0o]-[O0o]$/)) { // Kurze Rochade
                    pos = pos.replace("K", "e"); // Figuren/Buchstaben werden vertauscht
                    posReplace(68, "R");
                    posReplace(69, "K");
                    posReplace(70, "e");
                    castl = castl.replace("KQ", ""); // Rochiermöglichkeiten werden angepasst
                } else if(castl.includes("Q") && move.match(/^[O0o]-[O0o]-[O0o]$/)) { // Lange Rochade
                    pos = pos.replace("K", "e"); // Figuren/Buchstaben werden vertauscht
                    posReplace(63, "e");
                    posReplace(65, "K");
                    posReplace(66, "R");
                    castl = castl.replace("KQ", ""); // Rochiermöglichkeiten werden angepasst
                } else if(move.length === 5) { // Keine Angabe von Figur bedeutet Bauernzug, Felder werden gelesen und in Indizes umgewandelt, auf welchen Figuren/Buchstaben angepasst werden
                    posReplace(calcIndex(move.substr(0, 2)), "e")
                    posReplace(calcIndex(move.substr(3, 2)), "P")
                } else if(move.length === 6) { // Ansonsten wird Figur herausgelesen und entsprechend umgestellt
                    const figure = move.substr(0, 1);
                    posReplace(calcIndex(move.substr(1, 2)), "e")
                    posReplace(calcIndex(move.substr(4, 2)), figure)
                }
            } else if(i % 2 === 1) { // Schwarz am Zug
                if(castl.includes("k") && move.match(/^[O0o]-[O0o]$/)) { // Kurze Rochade
                    pos = pos.replace("k", "e"); // Figuren/Buchstaben werden vertauscht
                    posReplace(5, "r");
                    posReplace(6, "k");
                    posReplace(7, "e");
                    castl = castl.replace("kq", ""); // Rochiermöglichkeiten werden angepasst
                } else if(castl.includes("q") && move.match(/^[O0o]-[O0o]-[O0o]$/)) { // Lange Rochade
                    pos = pos.replace("k", "e"); // Figuren/Buchstaben werden vertauscht
                    posReplace(0, "e");
                    posReplace(2, "k");
                    posReplace(3, "r");
                    castl = castl.replace("kq", ""); // Rochiermöglichkeiten werden angepasst
                } else if(move.length === 5) { // Keine Angabe von Figur bedeutet Bauernzug, Felder werden gelesen und in Indizes umgewandelt, auf welchen Figuren/Buchstaben angepasst werden
                    posReplace(calcIndex(move.substr(0, 2)), "e")
                    posReplace(calcIndex(move.substr(3, 2)), "p")
                }  else if(move.length === 6) { // Ansonsten wird Figur herausgelesen und entsprechend umgestellt
                    const figure = move.substr(0, 1).toLowerCase();
                    posReplace(calcIndex(move.substr(1, 2)), "e")
                    posReplace(calcIndex(move.substr(4, 2)), figure)
                }
            }
        }

        // 'col' (Spieler am Zug) wird anhängig von der Anzahl der in unserem Fall halben Züge definiert
        const col = (num % 2 === 0) ? "w" : "b";

        return new dataPosition.Position(pos, col, castl, num);
    }
}

const openings = [
    new Opening("C", 45, "Königsspringerspiel", "Schottische Partie",  ["Hauptvariante", "Schmidt-Variante", "Steinitz-Variante", "Schottisches Gambit"], ["e2-e4","e7-e5","Ng1-f3","Nb8-c6","d2-d4", "e5xd4"], "Die Schottische Partie ist eine offene Eröffnung und entwickelt sich aus dem Königsspringerspiel, manchmal auch aus dem Mittelgambit. Die Eröffnung hat neben ihrer Hauptvariante nur wenige Nebenvarianten und Gambits, weswegen man die Theorie schnell erlernen kann und die Eröffnung nur in ECO-Nummer C45 vorzufinden ist."),
    //new Opening("C", 45, "Schottische Partie", "Hauptvariante",  ["Hauptvariante", "Schmidt-Variante", "Steinitz-Variante"], ["e2-e4","e7-e5","Ng1-f3","Nb8-c6","d2-d4", "e5xd4","Nf3xd4"], "Die Schottische Partie ist eine offene Eröffnung und entwickelt sich aus dem Königsspringerspiel, manchmal auch aus dem Mittelgambit. Die Eröffnung hat neben ihrer Hauptvariante nur wenige Nebenvarianten und Gambits, weswegen man die Theorie schnell erlernen kann und die Eröffnung nur in ECO-Nummer C45 vorzufinden ist."),
    new Opening("C", 45, "Schottische Partie", "Hauptvariante",  [], ["e2-e4","e7-e5","Ng1-f3","Nb8-c6","d2-d4","e5xd4","Nf3xd4","Bf8-c5","Bc1-e3","Qd8-f6","c2-c3","Ng8-e7"], "Die Schottische Partie ist eine offene Eröffnung und entwickelt sich aus dem Königsspringerspiel, manchmal auch aus dem Mittelgambit. Die Eröffnung hat neben ihrer Hauptvariante nur wenige Nebenvarianten und Gambits, weswegen man die Theorie schnell erlernen kann und die Eröffnung nur in ECO-Nummer C45 vorzufinden ist."),
    new Opening("C", 45, "Schottische Partie", "Schmidt-Variante",  [], ["e2-e4","e7-e5","Ng1-f3","Nb8-c6","d2-d4","e5xd4","Nf3xd4","Ng8-f6"], "Die Schottische Partie ist eine offene Eröffnung und entwickelt sich aus dem Königsspringerspiel, manchmal auch aus dem Mittelgambit. Die Eröffnung hat neben ihrer Hauptvariante nur wenige Nebenvarianten und Gambits, weswegen man die Theorie schnell erlernen kann und die Eröffnung nur in ECO-Nummer C45 vorzufinden ist."),
    new Opening("C", 45, "Schottische Partie", "Schottisches Gambit",  [], ["e2-e4","e7-e5","Ng1-f3","Nb8-c6","d2-d4","e5xd4","Bf1-c4"], "Die Schottische Partie ist eine offene Eröffnung und entwickelt sich aus dem Königsspringerspiel, manchmal auch aus dem Mittelgambit. Die Eröffnung hat neben ihrer Hauptvariante nur wenige Nebenvarianten und Gambits, weswegen man die Theorie schnell erlernen kann und die Eröffnung nur in ECO-Nummer C45 vorzufinden ist. Das Schottische Gambit ist eine Abwandlung, in der man vorerst einen Bauern für einen Entwicklungsvorteil opfert.")
]

module.exports = {
    openings: openings,
    Opening: Opening
}
