const User = require("../Model/user");
async function handleGetAllTheUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function handleCreateUser(req, res) {
  const body = req.body;
  const result = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
  });
  return res.json({ status: "Created", id: result._id });
}
async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  return res.json(user);
}
async function handleEditUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, req.body);
  return res.json({ status: "Updated" });
}
async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "deleted" });
}

module.exports = {
  handleGetAllTheUsers,
  handleCreateUser,
  handleGetUserById,
  handleDeleteUserById,
  handleEditUserById,
};
