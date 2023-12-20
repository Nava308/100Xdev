/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/
const updateMap = (map, character) => {
  if (!map[character]) {
    map[character] = 1;
  } else {
    map[character] = map[character] + 1;
  }
};

const createFrequencyMap = (string) => {
  map = {};
  for (var char of string) {
    updateMap(map, char);
  }
  return map;
};

const isMapsIdentical = (map1, map2) => {
  if (Object.keys(map1).length !== Object.keys(map2).length) {
    return false;
  }

  for (let [key, value] of Object.entries(map1)) {
    console.log(key, value);
    if (!map2[key] || map2[key] !== value) {
      return false;
    }
  }
  return true;
};
function isAnagram(str1, str2) {
  map1 = createFrequencyMap(str1.toLowerCase());
  map2 = createFrequencyMap(str2.toLowerCase());
  return isMapsIdentical(map1, map2);
}
module.exports = isAnagram;
