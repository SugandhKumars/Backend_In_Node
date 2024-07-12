const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello JI");
});

app.listen(3000, () => {
  console.log("server Started");
});
