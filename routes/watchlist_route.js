import express from "express";
const router = express.Router();
import authMiddleware from "../middleware/authmiddleware.js";
import {
  getUserWatchlists,
  addMovieToWatchlist,
  removeMovieFromWatchlist,
} from "../controllers/watchlistController.js";

router.use(authMiddleware);

//  Separate route for adding a movie
router.post("/", addMovieToWatchlist);

router.get("/", getUserWatchlists);

router.delete("/:movieId", authMiddleware, removeMovieFromWatchlist);

export default router;
