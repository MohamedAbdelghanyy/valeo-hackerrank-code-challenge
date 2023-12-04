'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'isValid' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function isValid(s) {
    // Write your code here
    let isFrequenciesValid = false;

    // Count Frequencies
    let freq = [];
    for (let i = 0; i < s.length; i++) {
        let isFound = false;
        for (let j = 0; j < freq.length; j++) {
            if (s[i] == freq[j][0]) {
                freq[j][1]++;
                isFound = true;

            }
        }
        if (!isFound) {
            freq.push([s[i], 1]);
        }
    }

    // Sorting Frequencies
    freq.sort(function (a, b) {
        return a[1] - b[1];
    });

    // Chacking differences between the first frequency and last one
    if (freq[0][1] - freq[freq.length - 1][1] == 0) {
        isFrequenciesValid = true;
    } else if ((freq[1][1] - freq[freq.length - 1][1] == 0) && freq[0][1] == 1) {
        // In case that only first character frequency
        // in the sorted array is the different by 1 only
        // so removing the character will make it valid (unique case)
        isFrequenciesValid = true;
    } else if (freq[0][1] - freq[freq.length - 1][1] + 1 == 0
        && freq[0][1] - freq[freq.length - 2][1] == 0) {
        // To make sure that the only difference is with
        // the last character only in the sorted array
        isFrequenciesValid = true;
    }

    if (isFrequenciesValid) {
        return "YES";
    } else {
        return "NO";
    }

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = isValid(s);

    ws.write(result + '\n');

    ws.end();
}
