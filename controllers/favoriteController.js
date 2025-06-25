import axios from "axios";
import Favorite from "../models/Favorite.js";
import User from "../models/Users.js";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.API_KEY;

// Add a movie to favorites
export const addFavoriteMovie = async (req, res) => {
  try { 
        const { movieId } = req.body
        const user = await User.findById(req.user.id)

        if (!user) {
            return res.status(400).json({ error: "User Not Found" })
        }

        const exists = await Favorite.findOne({ userId: req.user.id, movieId });

        if (exists) {
            return res.status(400).json({ message: "Already Added To Favorites" })
        };
        const url = `${TMDB_BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;

        const response = await axios.get(url);
        const favorite = new Favorite({
            userId: req.user.id,
            movieId,
            movieData: response.data
          });
      
          await favorite.save();

        res.status(200).json({
            message: "Favorites Updated",
            favorite
        })

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
};


export const removeFavoriteMovie = async (req, res) => {
  try {
    await Favorite.findOneAndDelete({
      userId: req.user.id,
      movieId: req.params.id,
    });
    res.json({ message: "Removed" });
  } catch (err) {
     res.status(500).json({ message: err.message });
  }
};

// Get all favorite movies
export const getFavoriteMovies = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.id });
    res.json(favorites.map(fav => fav.movieData));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
