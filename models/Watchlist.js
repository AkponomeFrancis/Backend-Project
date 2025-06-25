import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  movieId: { type: Number, required: true }, 
  movieData: Object
}, { timestamps: true });

export default mongoose.model("Watchlist", watchlistSchema);