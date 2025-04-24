import express from "express";
import {
  getMoviesByCategory,
  getMovieById,
  getMovieCredits,
  getSimilarMovies,
  getMovieVideos,
} from "../controllers/movieController";

const router = express.Router();

router.get("/movies/:category", getMoviesByCategory);
router.get("/movie/:movieId", getMovieById);
router.get("/movie/:movieId/credits", getMovieCredits);
router.get("/movie/:movieId/similar", getSimilarMovies);
router.get("/movie/:movieId/videos", getMovieVideos);

export default router;
