const arrayOfAlternativesNumber = new Array(4, 4, 4, 4);
const digitsOfAlternativesNumber = new Array(1, 1, 1, 1);
/*const number = prompt("Enter number of groups alternatives:");
for (let i = 0; i < number; i++) {
    arrayOfAlternativesNumber.push(prompt(`Enter number of alternatives for K${i + 1} group:`));
    digitsOfAlternativesNumber.push(1);
}*/


const alternativesHeader = new Array(arrayOfAlternativesNumber.reduce((a, b) => a + b - 1))
const alternatives = new Array(arrayOfAlternativesNumber.reduce((a, b) => a + b - 1) - 1);
const alternativesString = new Array(arrayOfAlternativesNumber.reduce((a, b) => a + b - 1) - 1);


function initTable() {
    let digit = 0;
    for (let i = 0; i < alternativesHeader.length - 1; i++) {
        if (digitsOfAlternativesNumber[digit] >= arrayOfAlternativesNumber[digit]) {
            digitsOfAlternativesNumber[digit] = 1;
            digit++;
        }
        digitsOfAlternativesNumber[digit]++;
        alternativesHeader[i] = parseInt(digitsOfAlternativesNumber.join(""));
    }

    for (let i = 0; i < alternatives.length; i++) {
        alternativesString[i] = new Array(alternatives.length);
        alternatives[i] = new Array(alternatives.length);
        for (let j = 0; j < alternatives.length; j++) {
            if (i === j) {
                alternatives[i][j] = 2;
                alternativesString[i][j] = "=";

            } else if (j > i) {
                alternatives[i][j] = 0;
                alternativesString[i][j] = "0";
            } else {
                alternatives[i][j] = " "
                alternativesString[i][j] = " ";
            }
        }
    }
}

function showTable() {
    console.log((" ".repeat(arrayOfAlternativesNumber.length) + alternativesHeader.join(" ") + " ".repeat(5)));
    for (let i = 0; i < alternativesHeader.length - 1; i++) {
        console.log(`${alternativesHeader[i].toString()}  ${alternatives[i].join("    ") + "  ".repeat(5)} `)
    }
    console.log();
}

function compareByRows() {
    let groupCounter = 0;

    for (let i = 0; i < alternativesHeader.length - 1; i++) {
        for (let j = i; j < alternatives[i].length; j++) {
            if (i !== j) {
                if (i === 0 && j === arrayOfAlternativesNumber.slice(0, groupCounter + 1).reduce((a, b) => a + b - 1) - 1) {
                    alternatives[i][j] = 1;
                    alternativesString[i][j] = "o"
                    groupCounter++;
                } else if (alternativesHeader[i] < alternativesHeader[j]) {
                    alternatives[i][j] = 1;
                    if(alternativesHeader[j]==alternativesHeader[1]){
                        alternativesString[i][j]="o"
                    }
                    else{
                        alternativesString[i][j] = ">"
                    }
                }
            }

        }

    }
}

function compareByColumns() {
    let comparingGroup = 0;
    let counter = 0;
    const lastColumn = alternativesHeader.length - 2;
    for (let i = 1; i < alternativesHeader.length - 1; i++) {
        let first = returnFirstInGroup(counter);

        if (alternativesHeader[i] == first || alternativesHeader[i] === alternativesHeader[1]) {
            for (let j = 0; j < alternativesHeader.length - 2; j++) {
                if (alternatives[i][j] === 0) {
                    if (alternativesHeader[i] > alternativesHeader[j]) {
                        alternatives[i][j] = 3;
                        alternativesString[i][j] = "o"
                    }
                }
            }
            counter++;
        } else {
            fillVerticalTransition(i)
        }

        if (alternatives[i][lastColumn] != 2) {
            alternatives[i][lastColumn] = 1
            let alternative1 = alternativesHeader[i - 1], alternative2 = alternativesHeader[i];
            let firstGroupNumber = returnGroupNumber(alternativesHeader[i - 1])
            let secondGroupNumber = returnGroupNumber(alternativesHeader[i])
            if (i != 0 && returnGroupNumber(alternativesHeader[i]) == returnGroupNumber(alternativesHeader[i - 1])) {
                alternativesString[i][lastColumn] = ">";
            } else {
                alternativesString[i][lastColumn] = "o";
            }
        }

    }
}

function fillTransition() {
    let groupCounter = 0;
    for (groupCounter; groupCounter < arrayOfAlternativesNumber.length; groupCounter++) {
        const first = returnFirstInGroup(groupCounter);
        for (let j = alternativesHeader.indexOf(first); j < alternativesHeader.indexOf(first) + arrayOfAlternativesNumber[groupCounter]; j++) {
            if (first < alternativesHeader[j] && first != alternativesHeader[j] && alternativesHeader[j] != alternativesHeader[1]) {
                alternativesString[0][j] = ">";
                alternatives[0][j] = 1;
            }
        }
    }
}

function fillVerticalTransition(index) {
    for (let j = 0; j < alternativesHeader.length - 2; j++) {
        if (alternatives[index][j] === 0) {
            alternatives[index][j] = 3;
            alternativesString[index][j] = ">";
        }
    }
}


function returnFirstInGroup(groupCounter) {
    if (groupCounter == 0) {
        return alternativesHeader[0];
    }
    return alternativesHeader[arrayOfAlternativesNumber.slice(0, groupCounter).reduce((a, b) => a + b - 1) - 1];
}

function returnGroupNumber(alternative) {

    const alternativeIndex = alternativesHeader.indexOf(alternative);

    if (alternativeIndex < arrayOfAlternativesNumber[0] - 1) {
        return 0;
    } else {
        let groupCounter = 0;
        let i = 0;
        while (i < alternativeIndex) {
            i += arrayOfAlternativesNumber[groupCounter] - 1
            if (alternativeIndex >= i) {
                groupCounter++
            }

        }
        return groupCounter;
    }

}


function checkForOriginal(j) {
    if (j > 0 && j < alternativesHeader.length - 2) {
        return Math.abs(alternativesHeader[j - 1] - alternativesHeader[j]) > Math.abs(alternativesHeader[j] - alternativesHeader[j + 1])
    }
}

function buildPaths() {
    let path = new Array();
    for (let i = 0; i < alternativesHeader.length - 1; i++) {
        let min = Math.min(...path)
        if (path.length == 0) {
            path.push(alternativesHeader[i])

        } else if (alternativesHeader[i] == alternativesHeader[alternativesHeader.length - 2]) {
            path.push(alternativesHeader[i])
        } else if (returnGroupNumber(alternativesHeader[i]) == returnGroupNumber(alternativesHeader[i - 1])) {
            path.splice(path.indexOf(alternativesHeader[i - 1]) + 1, 0, alternativesHeader[i])
        } else {
            path.splice(1, 0, alternativesHeader[i])
        }
    }
    path.splice(0, 0, 1111)
    return path
}

function initVectorComparisonTable(path) {
    let table = new Array(Math.max(...arrayOfAlternativesNumber))
    for (let i = 0; i < table.length; i++) {
        table[i] = new Array(3);
    }

    let array = new Array(table.length);
    for (let i = 1; i < array.length + 1; i++) {
        array[i - 1] = i;
    }

    for (let i = 0; i < table.length; i++) {
        table[i] = new Array(3);
        table[i][0] = array.join("");
        array.push(array.shift())
        table[i][1] = formVectorGradeByScale(table[i][0], path)
        table[i][1] = formVectorGradeByScale(table[i][0], path).join("")
        table[i][2] = formVectorGradeByScale(table[i][0], path).sort().join("")
        table[i].join("  ")
    }

    return table
}

function formVectorGradeByScale(startGrade, path) {
    let arrayGrade = new Array(startGrade.length);
    for (let i = 0; i < arrayGrade.length; i++) {
        for (let j = 0; j < path.length; j++) {
            let point = path[j];
            if (startGrade.at(i) == path[j].toString().at(i)) {
                arrayGrade[i] = j + 1;
                break;
            }
        }
    }
    return arrayGrade;
}

function main() {
    initTable()
    showTable()
    compareByRows()
    showTable()
    fillTransition()
    showTable()
    compareByColumns()
    showTable()
    const path = buildPaths()
    const comparisonTable = initVectorComparisonTable(path);

    console.log(path.join(" > "))
    console.log(formatMatrix(comparisonTable))
}

// Функция для форматированного вывода матрицы
function formatMatrix(matrix) {
    const headers = ["                       Векторна оцінка", "Векторна оцінка за єдиною порядковою шкалою", "Векторна оцінка за зростанням рангів"];
    const rows = ["1 - Rapid Harvest", "2 - Steady Picker", "3 - Easy Harvest Pro", "4 - Function Master"];

    let maxColWidths = new Array(headers.length).fill(0);
    for (let i = 0; i < headers.length; i++) {
        maxColWidths[i] = headers[i].length;
        for (let j = 0; j < matrix.length; j++) {
            let numWidth = matrix[j][i].toString().length;
            if (numWidth > maxColWidths[i]) {
                maxColWidths[i] = numWidth;
            }
        }
    }

    let output = "";
// header row
    for (let i = 0; i < headers.length; i++) {
        let colWidth = maxColWidths[i];
        output += headers[i].padEnd(colWidth + 2);
    }
    output += "\n";
// separator row
    for (let i = 0; i < headers.length; i++) {
        let colWidth = maxColWidths[i];
        output += "".padEnd(colWidth-10, "-").padEnd(colWidth-10);
    }
    output += "\n";
// data rows
    for (let i = 0; i < matrix.length; i++) {
        output += rows[i].padEnd(maxColWidths[0]-2);
        for (let j = 0; j < matrix[i].length; j++) {
            let colWidth = maxColWidths[j];
            output += matrix[i][j].toString().padEnd(colWidth-20);
        }
        output += "\n";
    }

    return output;
}
main()
