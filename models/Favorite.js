import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: { type: Number, required: true },
    movieData: Object
  },
  { timestamps: true }
);

// Enforce uniqueness of (userId + movieId)
favoriteSchema.index({ userId: 1, movieId: 1 }, { unique: true });
const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;
