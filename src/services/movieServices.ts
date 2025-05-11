import axios from "axios";
import {
  Movie,
  MovieCredits,
  MovieVideos,
  SimilarMovies,
} from "../types/movieTypes";
import { API_BASE_URL, API_KEY } from "../constants/constants";
import {
  mapResponseToMovieList,
  mapResponseToMovie,
  mapMovieCredits,
  mapSimilarMovies,
  mapMovieVideos,
} from "../mappers/mappers";

export const fetchMoviesByCategory = async (
  category: string
): Promise<Movie[] | null> => {
  const data = await makeApiRequest(`${API_BASE_URL}/movie/${category}`);
  return data ? mapResponseToMovieList(data) : null;
};

export const fetchMovieById = async (
  movieId: string
): Promise<Movie | null> => {
  const data = await makeApiRequest(`${API_BASE_URL}/movie/${movieId}`);
  const trailerKey = await getMovieTrailerKey(movieId);
  const movieDetails = data ? mapResponseToMovie(data) : null;
  if (movieDetails) {
    movieDetails.trailerKey = trailerKey;
  }
  return movieDetails;
};

export const getMovieCreditsById = async (
  movieId: number
): Promise<MovieCredits | null> => {
  const data = await makeApiRequest(`${API_BASE_URL}/movie/${movieId}/credits`);
  return data ? mapMovieCredits(data) : null;
};

export const getSimilarMoviesById = async (
  movieId: number
): Promise<SimilarMovies | null> => {
  const data = await makeApiRequest(`${API_BASE_URL}/movie/${movieId}/similar`);
  return data ? mapSimilarMovies(data) : null;
};

export const getMovieVideosById = async (
  movieId: number
): Promise<MovieVideos | null> => {
  const data = await makeApiRequest(`${API_BASE_URL}/movie/${movieId}/videos`);
  return data ? mapMovieVideos(data) : null;
};

export const getMovieTrailerKey = async (
  movieId: string
): Promise<string | null> => {
  const movieVideos = await getMovieVideosById(Number(movieId));
  if (!movieVideos) {
    return null;
  }

  const trailerKey2160 =
    movieVideos.results.find(
      (video) => video.type.toLowerCase() === "trailer" && video.size === 2160
    )?.key || null;
  if (trailerKey2160) {
    return trailerKey2160;
  }

  const trailerKey =
    movieVideos.results.find((video) => video.type.toLowerCase() === "trailer")
      ?.key || null;

  return trailerKey || null;
};

axios.defaults.headers.common["Authorization"] = `Bearer ${API_KEY}`;
const makeApiRequest = async <T>(url: string): Promise<T | null> => {
  try {
    const response = await axios.get(url, {
      params: {
        include_adult: false,
      },
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
