function Position(positionString, activeColor, castlingAvailability, numberOfMoves) {
    this.positionString = positionString;
    this.activeColor = function () {
        return (activeColor === "w" ? "Weiß" : "Schwarz") + " ist am Zug.";
    }
    this.castlingAvailability = function () {
        let abgabe = "";
        if (castlingAvailability.includes("K")) abgabe += " Weiß kann kurz rochieren.\n";
        if (castlingAvailability.includes("Q")) abgabe += " Weiß kann lang rochieren.\n";
        if (castlingAvailability.includes("k")) abgabe += " Schwarz kann kurz rochieren.\n";
        if (castlingAvailability.includes("q")) abgabe += " Schwarz kann lang rochieren.\n";
        if (!castlingAvailability.includes("K") && !castlingAvailability.includes("Q") && !castlingAvailability.includes("k") && !castlingAvailability.includes("q")) abgabe += "Keiner kann in dieser Stellung rochieren."
        return abgabe;
    }
    this.numberOfMoves = function () {
        // Wenn man eine neue Stellung anlegt, wird numberOfMoves als String übergeben und deswegen ist ein parseInt nötig
        return "Das Spiel ist im " + (numberOfMoves + 1) + ". halben Zug.";
    }
    this.currentFullMove = function () { // von Alex geschrieben, damit es eine simple und zu Eröffnungen passende Alternative zu numberOfMoves gibt
        return "Das Spiel nach " + Math.ceil(numberOfMoves / 2) + " ganzen Zügen.";
    }
    this.analysis = function () {
        let numberActiveColor = activeColor === "w" ? 0.2 : -0.2;
        let numberCastlingAvailability = function () {
            let abgabe = 0;
            if (castlingAvailability.includes("K")) abgabe += 0.5;
            if (castlingAvailability.includes("Q")) abgabe += 0.5;
            if (castlingAvailability.includes("k")) abgabe -= 0.5;
            if (castlingAvailability.includes("q")) abgabe -= 0.5;
            return abgabe;
        }
        let numberPieces = function () {
            let abgabe = 0;
            let actualString = positionString;
            for (let i = 0; i < 71; i++) {
                let tmp = actualString.substr(0, 1);
                switch (tmp) {
                    case "Q":
                        abgabe = abgabe + 9;
                        break;
                    case "R":
                        abgabe = abgabe + 5;
                        break;
                    case "B":
                    case "N":
                        abgabe = abgabe + 3;
                        break;
                    case "P":
                        abgabe = abgabe + 1;
                        break;
                    case "q":
                        abgabe = abgabe - 9;
                        break;
                    case "r":
                        abgabe = abgabe - 5;
                        break;
                    case "b":
                    case "n":
                        abgabe = abgabe - 3;
                        break;
                    case "p":
                        abgabe = abgabe - 1;
                        break;
                    default:
                        break;
                }
                actualString = actualString.substring(1);
            }
            return abgabe;
        }
        return "Die Wertung beläuft sich somit auf " + (numberPieces() + numberActiveColor + numberCastlingAvailability());
    }
    this.countPieces = function () {
        return "Weiß hat " + this.countWhite() + " Figuren und Schwarz hat " + this.countBlack() + " Figuren.";
    }
    this.countWhite = function () {
        let abgabe = 0;
        let actualString = positionString;
        for (let i = 0; i < 71; i++) {
            let tmp = actualString.substr(0, 1);
            switch (tmp) {
                case "K":
                case "Q":
                case "R":
                case "B":
                case "N":
                case "P":
                    abgabe++;
                    break;
            }
            actualString = actualString.substring(1);
        }
        return abgabe;
    }
    this.countBlack = function () {
        let abgabe = 0;
        let actualString = positionString;
        for (let i = 0; i < 71; i++) {
            let tmp = actualString.substr(0, 1);
            switch (tmp) {
                case "k":
                case "q":
                case "r":
                case "b":
                case "n":
                case "p":
                    abgabe++;
                    break;
            }
            actualString = actualString.substring(1);
        }
        return abgabe;
    }
}

const positionsForPosition = [
    new Position("rnbqkenr/ppeeeppp/eepepeee/eeepeeee/ebPPeBee/eeNeeNee/PPeePPPP/ReeQKBeR", "b", "KQkq", 9),
    new Position("reeeerke/ppebeppp/eeeepnee/eePqeeee/eepPeBee/PeeePNee/eeQeePPP/ReeeeRKe", "b", "", 29),
    new Position("eeereeke/eeeeeppp/eeeBpeee/ebeneeee/peePeeee/eeeePeee/eeeeePPP/eeReeeKe", "w", "", 48),
    new Position("eeeekeee/eeeeeeee/eeeeeeee/PeeeeePe/eeeeePee/eeeePeee/eeeeeeee/eeeeKeee", "w", "", 94)
]

const positionsForOpening = [

]
module.exports = {
    positionsForPosition: positionsForPosition,
    positionsForOpening:positionsForOpening,
    Position: Position
}

