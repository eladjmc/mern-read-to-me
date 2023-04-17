import express from "express";

import {
  addDirectory,
  deleteDirectory,
  deleteDirectories,
  getDirectories,
} from "../controller/directoryController.js";
import { validateToken } from "../middleware/validateTokenHandler.js";

const router = express.Router();

// Public routes

// Private routes
router.use(validateToken);

router.route("/add-directory").post(addDirectory);
router.route("/get-directories").get(getDirectories);
router.route("/delete-directory").delete(deleteDirectory);
router.route("/delete-directories").delete(deleteDirectories);

export default router;
