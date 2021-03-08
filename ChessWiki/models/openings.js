function Opening(ecoCat, ecoSubcat, parent, name, moves, desc) {

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
}

let schottische_partie = new Opening("C", 45, "Königsspringerspiel", "Schottische Partie", ["e4","e5","Nf3","Nc6","d4"], "Die Schottische Partie ist eine offene Eröffnung und entwickelt sich aus dem Königsspringerspiel, manchmal auch aus dem Mittelgambit. Die Eröffnung hat neben ihrer Hauptvariante nur wenige Nebenvarianten und Gambits, weswegen man die Theorie schnell erlernen kann und die Eröffnung nur in ECO-Nummer C45 vorzufinden ist.");

module.exports = [schottische_partie];
