import express from "express";

import {
  registerUser,
  loginUser,
  currentUser,
  deleteUser,
} from "../controller/usersController.js";

import { validateToken } from "../middleware/validateTokenHandler.js";

const router = express.Router();

// Public routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// Private routes
router.use(validateToken);

router.route("/current").get(currentUser);
router.route("/delete-user").delete(deleteUser);

export default router;
