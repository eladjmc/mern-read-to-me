import express  from "express";


import { currentUser, getWelcome, loginUser, registerUser } from "../controller/usersController.js";
import { validateToken } from "../middleware/validateTokenHandler.js";

const router = express.Router();

router.route('/').get(getWelcome);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/current').get(validateToken, currentUser);


export default router;


