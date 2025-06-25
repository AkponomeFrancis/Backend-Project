import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import cors from "cors";
import session from "express-session";
import movieRoutes from "./routes/movie_route.js";
import favoriteRoutes from "./routes/favorite_route.js";
import reviewRoutes from "./routes/review_route.js";
import watchlistRoutes from "./routes/watchlist_route.js";
import discoverRoutes from "./routes/discover_route.js";
import userRoutes from "./routes/user_route.js";

const app = express();
dotenv.config()
// Middleware
app.use(express.json());
// CORS middleware
app.use(cors());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware for session management
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions',
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 1, // 1 hour
    httpOnly: true
  }
}));

// import user routes
import signUp from './routes/signup_route.js';
import login from './routes/login_route.js';

// home page
app.get("/", (req, res) => {
    res.send("Welcome to my Api");
})
// use route
app.use("/api/signup", signUp);
app.use("/api/login", login);
app.use("/api/movies", movieRoutes);
app.use("/api/discover", discoverRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/user", userRoutes);
// Connect to db
mongoose.connect(process.env.MONGODB_URI, {
// useNewUrlParser: true,
// useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected successfully");
})
.catch((error) => {
    console.error("MongoDB connection failed:", error.message);
});

app.listen(5000, () => console.log("app listening on port 5000"));