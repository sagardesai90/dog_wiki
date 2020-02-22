require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;
const fetch = require("node-fetch");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/", function(req, res) {
  res.send("hello world");
});

app.get("/breeds", function(req, res) {
  const { lat, lon } = req.query;
  fetch(`https://api.darksky.net/forecast/${DARKSKY}/${lat},${lon}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
    .then(dsRes => dsRes.json())
    .then(finRes => res.json(finRes));
});

app.listen(PORT, () => {
  console.log(`Listening on localhost:${PORT}`);
});
