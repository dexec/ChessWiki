/*Bearbeitet von Alexander Gromov
Durch den Button-Klick wird die Tabelle im Formular zum Anlegen einer Eröffnung
um eine Zeile erweitert*/

let moveNumber = 5;

function createTable() {
    moveNumber++;
    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");

    let label = document.createElement("label");
    let input1 = document.createElement("input");
    let input2 = document.createElement("input");

    label.setAttribute('for', 'zug' + moveNumber);
    label.textContent = moveNumber + '. ';
    input1.setAttribute('name', 'moves');
    input1.setAttribute('id', 'zug' + moveNumber);
    input1.setAttribute('type', 'text');
    input1.setAttribute('size', '5');
    input1.setAttribute('pattern', '^([KQRBN]?[a-h][1-8][-x][a-h][1-8][\\+#]?|[O0o]-[O0o](-[O0o])?)$');
    input2.setAttribute('name', 'moves');
    input2.setAttribute('id', 'zug' + moveNumber);
    input2.setAttribute('type', 'text');
    input2.setAttribute('size', '5');
    input2.setAttribute('pattern', '^([KQRBN]?[a-h][1-8][-x][a-h][1-8][\\+#]?|[O0o]-[O0o](-[O0o])?)$');

    tr.append(td1);
    td1.after(td2);
    td2.after(td3);

    td1.append(label);
    td2.append(input1);
    td3.append(input2);
    document.querySelector("table tr:last-of-type").after(tr);
}
