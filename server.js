const express = require("express");

// Import Routes
// const routes = require("./routes");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello there");
});

app.listen(5000);
