const likes = require("../likes");
const chai = require("chai");
const assert = chai.assert;
chai.config.truncateThreshold = 0;

describe('static tests', function () {
    it('should return correct text', function () {
        assert.strictEqual(likes([]), 'no one likes this');
        assert.strictEqual(likes(['Peter']), 'Peter likes this');
        assert.strictEqual(likes(['Jacob', 'Alex']), 'Jacob and Alex like this');
        assert.strictEqual(likes(['Max', 'John', 'Mark']), 'Max, John and Mark like this');
        assert.strictEqual(likes(['Alex', 'Jacob', 'Mark', 'Max']), 'Alex, Jacob and 2 others like this');
    });
});

describe('random tests', function () {
    var names = [], sample;

    function makestring(min, max) {
        var array = [];
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var length = Math.ceil((Math.random() * max) + min)

        if (max < min) return "Maximum argument should be greater than minimum!";

        for (var i = 0; i < length; i++) {
            array.push(possible[(Math.floor(Math.random() * possible.length))]);
        }

        return array.join("");
    }

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    while (names.length < 100) names.push(makestring(6, 10));

    it('should return correct text for 1 name', function () {
        sample = shuffle(names).slice(0, 1);
        assert.strictEqual(likes(sample.slice()), sample[0] + ' likes this');
    });

    it('should return correct text for 2 names', function () {
        sample = shuffle(names).slice(0, 2);
        assert.strictEqual(likes(sample.slice()), sample[0] + ' and ' + sample[1] + ' like this');
    });

    it('should return correct text for 3 names', function () {
        sample = shuffle(names).slice(0, 3);
        assert.strictEqual(likes(sample.slice()), sample[0] + ', ' + sample[1] + ' and ' + sample[2] + ' like this');
    });

    it('should return correct text for 4 or more names', function () {
        // 4 names
        sample = shuffle(names).slice(0, 4);
        assert.strictEqual(likes(sample.slice()), sample[0] + ', ' + sample[1] + ' and 2 others like this');

        // random number of names
        sample = shuffle(names).slice(0, Math.max(5, Math.min(99, Math.random() * 100)));
        assert.strictEqual(likes(sample.slice()), sample[0] + ', ' + sample[1] + ' and ' + (sample.length - 2) + ' others like this');

        // 100 names
        sample = shuffle(names);
        assert.strictEqual(likes(sample.slice()), sample[0] + ', ' + sample[1] + ' and 98 others like this');
    });
});