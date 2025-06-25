import axios from "axios";
import Review from "../models/Review.js";
import dotenv from "dotenv";
dotenv.config();
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.API_KEY;

export const addOrUpdateReview = async (req, res) => {
  const { movieId, rating, comment } = req.body;
  const userId = req.user.id;
  const username = req.user.name;

  try {
    const existing = await Review.findOne({ userId, movieId });

    if (existing) {
      existing.rating = rating;
      existing.comment = comment;
      await existing.save();
      return res.json(existing);
    }

    const newReview = new Review({
      userId,
      movieId,
      rating,
      comment,
      username,
    });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: "Failed to submit review" });
  }
};

export const getReviews = async (req, res) => {
  try {
    const userId = req.user.id;
    const reviews = await Review.find({ userId });

    // Enrich with TMDB titles
    const enrichedReviews = await Promise.all(
      reviews.map(async (review) => {
        try {
          const url = `${TMDB_BASE_URL}/movie/${review.movieId}?api_key=${API_KEY}`;
          const response = await axios.get(url);

          return {
            ...review.toObject(),
            title: response.data.title || "Untitled Movie",
          };
        } catch (error) {
          console.warn(`TMDB fetch failed for movieId ${review.movieId}:`, error.message);
          return {
            ...review.toObject(),
            title: "Unknown Title",
          };
        }
      })
    );

    res.status(200).json({
      message: "Reviews fetched successfully",
      reviews: enrichedReviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    res.status(500).json({ message: "Failed to fetch user reviews" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    await Review.findOneAndDelete({
      userId: req.user.id,
      movieId: req.params.id,
    });
    res.json({ message: "Review deleted" }); 
  } catch (err) {
    res.status(500).json({ error: "Failed to delete review" });
  }
};

// Get all reviews by the logged-in user
export const getUserReviews = async (req, res) => {
  try {
    const userId = req.user.id;

    const reviews = await Review.find({ userId });

    res.json({ reviews });
  } catch (err) {
    console.error("Error fetching user reviews:", err);
    res.status(500).json({ error: "Failed to get user reviews" });
  }
};
