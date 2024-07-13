const express = require("express");
const { default: mongoose } = require("mongoose");
const { string } = require("zod");
const app = express();
const port = 4000;
// Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
// Model
const User = mongoose.model("user", userSchema);
// Connection
mongoose.connect(`mongodb://127.0.0.1:27017/project1`).then(() => {
  console.log("Mongodb Connected");
});

app.use(express.urlencoded({ extended: false }));
// get
app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  res.send(allDbUsers);
});
// Get by id
app.get("/api/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
});
// Create
app.post("/api/users", async (req, res) => {
  const body = req.body;
  const result = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
  });
  return res.status(201).json({ status: "created" });
});
// Edit by id
app.patch("/api/users/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({ status: "Updated" });
});
// Delete by id
app.delete("/api/users/:id", async (req, res) => {
  let id = req.params.id;
  await User.findByIdAndDelete(id);
  res.json({ status: "deleted" });
});
app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});
