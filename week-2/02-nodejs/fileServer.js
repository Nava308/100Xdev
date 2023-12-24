/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const getFilesInFolder = () => {
  return new Promise((resolve, reject) => {
    fs.readdir("./files/", (err, files) => {
      if (err) reject(err);
      else resolve(files);
    });
  });
};

const getFileContent = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join("./files", filename), "utf-8", (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
};

app.get("/files", async (req, res) => {
  try {
    const files = await getFilesInFolder();
    return res.status(200).json(files);
  } catch (error) {
    return res.status(500).json(error);
  }
});
app.get("/file/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    //console.log(filename);
    const data = await getFileContent(filename);
    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    return res.status(404).send("File not found");
  }
});
app.all("*", (req, res) => {
  return res.status(404).send("Route not found");
});
module.exports = app;
