/*
Link: https://www.codewars.com/kata/5a1463678ba9145a670000f9
Kata: Berlin Clock
Author: dupreesi
Tags: Date Time, Strings, Fundamentals
*/
const p = (a) => parseInt(a);
function berlinClock(time) {
    let [hour, minute, second] = time.split`:`.map((el) => p(el));
    let r = "", s = "", t = "", f = "", fi = "";
    r = second % 2 == 0 ? "Y" : "O";
    fi = "Y".repeat(minute % 5) + "O".repeat(4 - minute % 5);
    f = ("Y".repeat(Math.floor(minute / 5)) + "O".repeat(11 - Math.floor(minute / 5))).split``.map((el, i, arr) => {
        let k = arr.lastIndexOf("O");
        if (k == -1) {
            return i == 2 || i == 5 || i == 8 ? "R" : el
        } else if (k !== -1 && arr[0] !== "O" && el !== "O") {
            return i == 2 || i == 5 || i == 8 ? "R" : el
        }
        return el
    }).join``;
    if (hour > 4) {
        if ((hour - 5 * Math.floor(hour / 5)) == 4) {
            t = "R".repeat(4);
        } else {
            t = "R".repeat((hour - 5 * Math.floor(hour / 5)) % 4) + "O".repeat(4 - (hour - 5 * Math.floor(hour / 5)) % 4);
        }
        s = "R".repeat(Math.floor(hour / 5)) + "O".repeat(4 - Math.floor(hour / 5));
    } else {
        t = "R".repeat(hour) + "O".repeat(4 - hour);
        s = "O".repeat(4);
    }
    return [r, s, t, f, fi].join`\n`
}