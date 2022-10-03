"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const fs = require("fs");
const path = require("path");

//Render application
app.use(function handleRequest(req, res) {
  let pathname = req.url;

  if (pathname == "/") {
    pathname = "/index.html";
  }

  let ext = path.extname(pathname);

  const typeExt = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css"
  };

  let contentType = typeExt[ext] || "text/plain";

  fs.readFile("src" + pathname, function(err, data) {
    if (err) {
      res.writeHead(500);
      return res.end("Error loading " + pathname);
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

module.exports = app;
