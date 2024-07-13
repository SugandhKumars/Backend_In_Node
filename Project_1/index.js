const express = require("express");

const app = express();
const port = 4000;
const userRouter = require("./Routes/user");
const { connectToMongodb } = require("./Connection");
// Connection
connectToMongodb(`mongodb://127.0.0.1:27017/project1`);

app.use(express.urlencoded({ extended: false }));
app.use("/api/users", userRouter);
app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});
