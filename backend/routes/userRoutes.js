import express from "express";

import {
  currentUser,
  getWelcome,
  loginUser,
  registerUser,
  addDirectory,
  addDocument,
  deleteUser,
  deleteDirectory,
  deleteDocument,


} from "../controller/usersController.js";
import { validateToken } from "../middleware/validateTokenHandler.js";

const router = express.Router();

// Public routes
router.route("/").get(getWelcome);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);


// Private routes
router.use(validateToken);

router.route("/current").get(currentUser);
router.route("/add-directory").post(addDirectory);
router.route("/add-document").post(addDocument);
router.route("/delete-user").delete(deleteUser);
router.route("/delete-directory").delete(deleteDirectory);
router.route("/delete-document").delete(deleteDocument);

export default router;
