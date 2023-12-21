/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(string) {
  let str = string.replace(/[^\w]/g, "");
  var start = 0;
  var end = str.length - 1;
  while (start < end) {
    if (str[start].toLowerCase() !== str[end].toLowerCase()) {
      return false;
    }
    start++;
    end--;
  }
  return true;
}

module.exports = isPalindrome;
