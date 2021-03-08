const position = require("../../models/positions");

function Test(a, b, number) {
    this.a = a;
    this.b = b;
    this.number = function() {
        return a+b;
    }
}

let test = new Test(1,2,3);
console.log(test.number());
