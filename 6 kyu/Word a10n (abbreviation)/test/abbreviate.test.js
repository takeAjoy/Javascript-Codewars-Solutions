const abbreviate = require("../abbreviate");

const { assert, config } = require('chai');
config.truncateThreshold = 0;
const _ = require('lodash');

function tester(input, expected) {
    assert.strictEqual(abbreviate(input), expected, `abbreviate(${JSON.stringify(input)})\n`);
}

describe("abbreviate", () => {

    it('Single short words', () => {
        tester("Java", "J2a");
        tester("image", "i3e");
        tester("gitlab", "g4b");
    });


    it('Single long words', () => {
        tester("internationalization", "i18n");
        tester("accessibility", "a11y");
        tester("Accessibility", "A11y");
    });

    it('One letter words', () => {
        tester('X', 'X');
    });

    it('Two letter words', () => {
        tester('Go', 'Go');
    });

    it('Three letter words', () => {
        tester('XML', 'XML');
    });

    it('With punctuation', () => {
        tester('Hello!! How are you today?', 'H3o!! How are you t3y?');
    });

    it('Joined with a separator', () => {
        tester('adava-kadavra!', 'a3a-k5a!');
        tester('example_git_branch', 'e5e_git_b4h');
    });

    it('Surrounded', () => {
        tester('(parenthesized)', '(p11d)');
        tester('"quoted"', '"q4d"');
        tester('[bracketed]', '[b7d]');
    });

    it('Example sentences', () => {
        tester("elephant-rides are really fun!", "e6t-r3s are r4y fun!");
        tester("You need, need not want, to complete this code-wars mission", "You n2d, n2d not w2t, to c6e t2s c2e-w2s m5n");
    });

    it('Empty string', () => {
        tester("", "");
    });

    it('Only separators', () => {
        tester(":;=;:", ":;=;:");
    });


    describe("Random Tests", () => {
        it("Predefined words", () => {
            const joiners = [", ", "-", ": ", "; ", ". ", "'", "_", " "];
            const words = ["cat", "mat", "doggy", "balloon", "sits", "sat", "a", "is", "on", "the", "monolithic", "double-barreled"];
            const words_abbreviated = ["cat", "mat", "d3y", "b5n", "s2s", "sat", "a", "is", "on", "the", "m8c", "d4e-b6d"];
            const indices = _.range(words.length);

            for (let i = 0; i < 50; ++i) {
                const n_words = _.random(1, words.length);
                const random_indices = _.sampleSize(indices, n_words);
                let input = words[random_indices[0]];
                let expected = words_abbreviated[random_indices[0]];

                _.tail(random_indices).forEach(e => {
                    const joiner = _.sample(joiners);
                    input += joiner + words[e];
                    expected += joiner + words_abbreviated[e];
                });

                tester(input, expected);
            }
        });

        it("Randomly generated words", () => {

            const lowercase = "abcdefghijklmnopqrstuvwxyz";
            const uppercase = lowercase.toUpperCase();

            const genLower = n => _.times(n, () => _.sample(lowercase)).join('');
            const genUpper = n => _.times(n, () => _.sample(uppercase)).join('');
            const genTitle = n => genUpper(1) + genLower(n - 1);

            const wordGens = [genLower, genUpper, genTitle];
            const genWord1 = () => _.sample(lowercase + uppercase);
            const genWord2 = () => _.sample(wordGens)(2);
            const genWord3 = () => _.sample(wordGens)(3);
            const genWordShort = () => _.sample(wordGens)(_.random(4, 8));
            const genWordLong = () => _.sample(wordGens)(_.random(10, 15));

            const genWord = () => _.sample([genWord1, genWord2, genWord3, genWordShort, genWordLong])();
            const genWords = limit => _.times(_.random(1, limit), genWord);

            const genClean = () => genWords(4).join(' ');
            const genBracketed = () => {
                const brackets = _.sample(["''", '""', '<>', '()', '[]', '{}', '//', '__', '**']);
                return `${brackets[0]}${genClean()}${brackets[1]}`;
            }
            const genPuncted = () => genClean() + _.sample('.,!?:;');
            const genMultiPuncted = () => genClean() + _.sample(['...', '??', '?!', '!!!']);
            const genSegmented = () => genWords(4).join(_.sample('.-/|_'));

            const genInput = () => {
                const segments = _.random(1, 4);
                const gens = [genPuncted, genMultiPuncted, genSegmented, genBracketed];
                return _.times(segments, () => _.sample(gens)()).join(' ');
            }

            function refsol(input) {
                const find = /[a-z]{4,}/gi;
                function replace(match) { return match[0] + (match.length - 2) + match[match.length - 1]; }
                return input.replace(find, replace);
            }

            for (let i = 0; i < 100; ++i) {
                const input = genInput();
                const expected = refsol(input);
                tester(input, expected);
            }
        });
    });
});