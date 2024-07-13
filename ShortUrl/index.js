const express = require("express");
const app = express();
const PORT = 8001;
const urlRouter = require("./routes/url");
const { addToMongoDB } = require("./connection");

// Connection
addToMongoDB("mongodb://127.0.0.1:27017/ShortUrls");
app.use(express.json());
app.use("/url", urlRouter);
app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
