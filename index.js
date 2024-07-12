const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello form HomePage");
});
app.get("/about", (req, res) => {
  res.send(`hey ${req.query.name}`);
});

app.listen(8000, () => {
  console.log("server Started");
});
