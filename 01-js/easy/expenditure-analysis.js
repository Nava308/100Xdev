/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/
const updateMap = (map, transaction) => {
  const category = transaction?.category;
  const price = transaction?.price;
  for (var i = 0; i < map.length; i++) {
    if (map[i].category === category) {
      map[i].totalSpent = map[i].totalSpent + price;
      return;
    }
  }
  map.push({ category: category, totalSpent: price });
};
function calculateTotalSpentByCategory(transactions) {
  map = [];
  transactions.forEach((transaction) => {
    updateMap(map, transaction);
  });
  return map;
}

module.exports = calculateTotalSpentByCategory;
