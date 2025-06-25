import axios from "axios"
import dotenv from "dotenv";
dotenv.config();
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.API_KEY;

// Get popular movies
export const getPopularMovies = async (req, res) => {
  const url = `${TMDB_BASE_URL}/movie/popular?api_key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data.results);
  } catch (err) {
    const message = err.message;
    const data = err.response?.data;
    res.status(500).json({
      error: "Failed to fetch popular movies",
      details: data || message,
    });
  }
};

// Search for movies
export const searchMovies = async (req, res) => {
  const query = req.query.title;
  try {
    const url = `${TMDB_BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`;
    const response = await axios.get(url);
    res.json(response.data.results);
  } catch (err) {
    console.error("Error searching movies:", err);
    res.status(500).json({ error: "Failed to search movies" });
  }
};

// Get movies by category
export const getMoviesByCategory = async (req, res) => {
  const { type } = req.params;
  const url = `${TMDB_BASE_URL}/movie/${type}?api_key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data.results);
  } catch (err) {
    console.error("❌ TMDB API failed:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch movies by category" });
  }
};


export const getMovieById = async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (err) {
    console.error("Error fetching movie details:", {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message,
    });
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
};

export const getMovieVideos = async (req, res) => {
  const { id } = req.params;
  const url = `${TMDB_BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data.results);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

export const getSimilarMovies = async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data.results);
  } catch (err) {
    console.error(" Error fetching similar movies:", err.message);
    res.status(500).json({ error: "Failed to fetch related movies" });
  }
};


export const discoverMovies = async (req, res) => {
  const { genre, year, sort_by = "popularity.desc" } = req.query;

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          language: "en-US",
          sort_by,
          with_genres: genre,
          primary_release_year: year,
        },
      }
    );

    res.json(response.data.results);
  } catch (error) {
    console.error("Discover Error:", error.message);
    res.status(500).json({ message: "Error fetching movies" });
  }
};
