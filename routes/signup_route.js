import express from "express";
import signupController from "../controllers/signUp.js"
const router = express.Router();

router.post('/',signupController);

export default router;