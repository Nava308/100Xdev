/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/
const isVowel = (char) =>
  char === "a" || char === "e" || char === "i" || char === "o" || char === "u";
function countVowels(str) {
  const string = str.toLowerCase();
  var vowelCount = 0;
  for (var char of string) {
    if (isVowel(char)) {
      vowelCount++;
    }
  }
  return vowelCount;
}

module.exports = countVowels;
