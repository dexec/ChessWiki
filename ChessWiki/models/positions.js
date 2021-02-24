function Positions(positionString, activeColor, castlingAvailability, moveNumber) {
    this.positionString = positionString;
    this.activeColor = activeColor;
    this.castlingAvailibity = castlingAvailability;
    this.moveNumber = moveNumber;
}

let listofopenings1 = new Positions("rebqkbnr/ppppeppp/eeneeeee/eeeepeee/eeePeeee/eeeeeNee/PPPePPPP/RNBQKBeR","w","KQkq",5);
let listofopenings2 = new Positions("reeqkbnr/ppepeppp/eeneeeee/eeeepeee/eeePeeee/eeeeeNee/PPPePPeP/RNBQKBeR","b","KQkq",7);
let listofopenings3 = new Positions("rebqkber/ppPpeppp/eeneeeee/eeeepeee/eeePeePe/eeeeeNee/ePPePPPP/RNeQKBeR","w","KQkq",9);

module.exports = [listofopenings1, listofopenings2, listofopenings3];