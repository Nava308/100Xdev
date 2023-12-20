const fs = require("fs");

const readFile = (filePath) =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
const cleanData = (data) =>
  data
    .split(" ")
    .filter((ele) => ele.length !== 0)
    .join(" ");

const writeFile = (filePath, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, "utf8", (error) => {
      if (error) reject(error);
      else resolve("Write success!");
    });
  });

const main = async () => {
  //   readFile("input.txt")
  //     .then((data) => {
  //       return writeFile("output.txt", cleanData(data));
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => console.log(err));
  try {
    const data = await readFile("input.txt");
    const cleanedData = cleanData(data);
    await writeFile("output.txt", cleanedData);
  } catch (error) {
    console.log(error);
  }
};

main();
