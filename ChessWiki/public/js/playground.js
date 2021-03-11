const position = require("../../models/positions");
const openings = require("../../models/openings");
const dataOpenings = openings.openings;

const newArray = openings.openings.map(opening => {
    return opening.name;
})
console.log(dataOpenings.filter(opening => opening.name==='Schottische Partie')[0]);
const newArray2 = openings.openings.filter(opening => {
    return opening.name === 'Schottische Partie'
})[0];
