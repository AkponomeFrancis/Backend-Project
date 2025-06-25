import axios from "axios";
import Watchlist from "../models/Watchlist.js";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.API_KEY;

// Get all watchlists for a user
export const getUserWatchlists = async (req, res) => {
  try {
    const userId = req.user.id;
    const lists = await Watchlist.find({ userId });
    res.json(lists.map(list => list.movieData));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch watchlists" });
  }
};

// Find or create default watchlist
export const addMovieToWatchlist = async (req, res) => {
  try {
    const { movieId } = req.body;
    const exists = await Watchlist.findOne({ userId: req.user.id, movieId });
    if (exists) return res.status(400).json({ message: "Movie already in watchlist" });

    const url = `${TMDB_BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;
    
      const response = await axios.get(url);

    const watchItem = new Watchlist({
      userId: req.user.id,
      movieId,
      movieData: response.data
    });

    await watchItem.save();

    res.status(201).json({message:"Added To watchlist",watchItem});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

// const addMovieToWatchlist = async (req, res) => {
//   const { movieId } = req.body;

//   try {
//     const existing = await Watchlist.findOne({ userId: req.user.id, movieId });
//     if (existing) {
//       return res.status(200).json({ message: "Already added" });
//     }

//     const newWatchlist = new Watchlist({
//       userId: req.user.id,
//       movieId
//     });
//     await newWatchlist.save();
//     res.status(201).json(newWatchlist);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// Remove a movie
export const removeMovieFromWatchlist = async (req, res) => {
    try {
      const { movieId } = req.params;
      
      const result = await Watchlist.findOneAndDelete({ userId: req.user.id, movieId });

      if (!result) return res.status(404).json({ message: "Movie not found in watchlist" });
  
      res.status(200).json({ message: "Removed from watchlist" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
