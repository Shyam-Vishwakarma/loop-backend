import { Request, Response, NextFunction } from "express";
import {
  fetchMoviesByCategory,
  fetchMovieById,
  getMovieCreditsById,
  getSimilarMoviesById,
  getMovieVideosById,
} from "../services/movieServices";

const validCategories = ["now_playing", "popular", "top_rated", "upcoming"];

const handleError = (res: Response, statusCode: number, message: string) => {
  res.status(statusCode).json({ error: message });
};

export const getMoviesByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { category } = req.params;

  if (!validCategories.includes(category)) {
    return handleError(res, 400, "Invalid movie category");
  }

  try {
    const movies = await fetchMoviesByCategory(category);
    if (!movies) {
      return handleError(res, 500, "Failed to fetch movies");
    }
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

export const getMovieById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { movieId } = req.params;

  if (!movieId) {
    return handleError(res, 400, "Movie ID is required");
  }

  try {
    const movieDetails = await fetchMovieById(movieId as string);
    if (!movieDetails) {
      return handleError(res, 500, "Failed to fetch movie details");
    }
    res.json(movieDetails);
  } catch (error) {
    next(error);
  }
};

export const getMovieCredits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { movieId } = req.params;

  try {
    const credits = await getMovieCreditsById(Number(movieId));
    if (!credits) {
      return handleError(res, 404, "Movie credits not found");
    }
    res.status(200).json(credits);
  } catch (error) {
    next(error);
  }
};

export const getSimilarMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { movieId } = req.params;

  try {
    const similarMovies = await getSimilarMoviesById(Number(movieId));
    if (!similarMovies) {
      return handleError(res, 404, "Similar movies not found");
    }
    res.status(200).json(similarMovies);
  } catch (error) {
    next(error);
  }
};

export const getMovieVideos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { movieId } = req.params;

  try {
    const movieVideos = await getMovieVideosById(Number(movieId));
    if (!movieVideos) {
      return handleError(res, 404, "Movie videos not found");
    }
    res.status(200).json(movieVideos);
  } catch (error) {
    next(error);
  }
};

export const getMovieTrailerKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { movieId } = req.params;
  try {
    const movieVideos = await getMovieVideosById(Number(movieId));
    if (!movieVideos) {
      return handleError(res, 404, "Movie videos not found");
    }
    const trailerKey = movieVideos.results.find(
      (video) => video.type.toLowerCase() === "trailer"
    )?.key;
    if (!trailerKey) {
      return handleError(res, 404, "Trailer not found");
    }
    res.status(200).json({ trailerKey });
  } catch (error) {
    next(error);
  }
};
