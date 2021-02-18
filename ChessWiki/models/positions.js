function Positions(positionString, activeColor, castlingAvailability, moveNumber) {
    this.positionString = positionString;
    this.activeColor = activeColor;
    this.castlingAvailibity = castlingAvailability;
    this.moveNumber = moveNumber;
}

let position1 = new Positions("rebqkbnr/ppppeppp/eeneeeee/eeeepeee/eeePeeee/eeeeeNee/PPPePPPP/RNBQKBeR","w","KQkq",5);
let position2 = new Positions("reeqkbnr/ppepeppp/eeneeeee/eeeepeee/eeePeeee/eeeeeNee/PPPePPeP/RNBQKBeR","b","KQkq",7);
let position3 = new Positions("rebqkber/ppPpeppp/eeneeeee/eeeepeee/eeePeePe/eeeeeNee/ePPePPPP/RNeQKBeR","w","KQkq",9);

module.exports = [position1, position2, position3];