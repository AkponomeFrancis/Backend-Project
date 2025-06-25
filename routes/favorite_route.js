import express from "express";
const router = express.Router();
import {
  addFavoriteMovie,
  removeFavoriteMovie,
  getFavoriteMovies,
} from "../controllers/favoriteController.js";
import authMiddleware from "../middleware/authmiddleware.js";

router.use(authMiddleware);

//  /api/favorites
router.post("/", addFavoriteMovie);

// GET /api/favorites
router.get("/", getFavoriteMovies);

// DELETE /api/favorites/:id
router.delete("/:id", removeFavoriteMovie);

export default router;
 