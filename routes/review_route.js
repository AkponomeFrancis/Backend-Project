import express from "express";
const router = express.Router();
import {
  addOrUpdateReview,
  getReviews,
  deleteReview,
  getUserReviews,
} from "../controllers/reviewController.js";
import authMiddleware from "../middleware/authmiddleware.js";

// GET reviews for movieId
// router.get("/:id", getReviews); 

router.get("/", authMiddleware, getReviews);

// POST 
router.post("/", authMiddleware, addOrUpdateReview); 

// DELETE by movieId
router.delete("/:id", authMiddleware, deleteReview); 

export default router;
