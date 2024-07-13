const express = require("express");
const router = express.Router();
const {
  handleGetAllTheUsers,
  handleCreateUser,
  handleGetUserById,
  handleEditUserById,
  handleDeleteUserById,
} = require("../controllers/user");

router.route("/").get(handleGetAllTheUsers).post(handleCreateUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleEditUserById)
  .delete(handleDeleteUserById);

module.exports = router;
