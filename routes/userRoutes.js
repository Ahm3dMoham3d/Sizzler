// Express Router
const express = require("express");
const router = express.Router();

// Controllers
const userController = require("../controllers/userController");
const authController = require("../controllers/auth/authController");
router.route("/signup").post(authController.addUser);
router.route("/login-admin").post(authController.loginAdmin);
router.route("/login-users").post(authController.loginUsers);

router.route("/").get(userController.getAllUser);
router
  .route("/:id")
  .get(userController.getOneUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = router;
