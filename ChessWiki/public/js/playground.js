const position = require("../../models/positions");

let einePosition = position[0];
let actualString = einePosition.positionString;
let countWhite = 0;
let countBlack = 0;

for (let i = 0; i < 71; i++) {
    let tmp = actualString.substr(0, 1);
    switch (tmp) {
        case "K":
            countBlack++;
            break;
        case "Q":
            countBlack++;
            break;
        case "R":
            countBlack++;
            break;
        case "B":
            countBlack++;
            break;
        case "N":
            countBlack++;
            break;
        case "P":
            countBlack++;
            break;
        case "k":
            countWhite++;
            break;
        case "q":
            countWhite++;
            break;
        case "r":
            countWhite++;
            break;
        case "b":
            countWhite++;
            break;
        case "n":
            countWhite++;
            break;
        case "p":
            countWhite++;
            break;
        default:
            break;
    }
    actualString = actualString.substring(1);
}
console.log(countWhite, countBlack);