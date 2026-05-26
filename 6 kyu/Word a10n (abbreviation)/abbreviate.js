/*
Link: https://www.codewars.com/kata/5375f921003bf62192000746
Kata: Word a10n (abbreviation)
Author: wthit56
Tags: Strings, Fundamentals
*/
function abbreviate(string) {
    return string.replaceAll(/\p{L}+/gu, (word) => {
        let n = word.length;
        if (n >= 4) {
            return word[0] + (n - 2) + word[n - 1];
        }
        return word;
    });
}

module.exports = abbreviate;