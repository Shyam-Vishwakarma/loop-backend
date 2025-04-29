import express from "express";
import * as movieController from "../controllers/movieController";

const router = express.Router();

router.get("/movies/:category", movieController.getMoviesByCategory);
router.get("/movie/:movieId", movieController.getMovieById);
router.get("/movie/:movieId/credits", movieController.getMovieCredits);
router.get("/movie/:movieId/similar", movieController.getSimilarMovies);
router.get("/movie/:movieId/videos", movieController.getMovieVideos);
router.get("/movie/:movieId/trailerKey", movieController.getMovieTrailerKey);

export default router;
