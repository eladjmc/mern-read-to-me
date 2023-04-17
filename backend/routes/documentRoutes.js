import express from "express";
import {
  addDocument,
  deleteDocument,
  getDocuments,
} from "../controller/documentController.js";
import { validateToken } from "../middleware/validateTokenHandler.js";

const router = express.Router();

// Public routes

// Private routes
router.use(validateToken);

router.route("/add-document").post(addDocument);
router.route("/get-documents").get(getDocuments);
router.route("/delete-document").delete(deleteDocument);

export default router;