import {
  Movie,
  MovieDetails,
  Genre,
  CastMember,
  MovieCredits,
  SimilarMovies,
  VideoResult,
  MovieVideos,
} from "../types/movieTypes";

export function mapResponseToMovieList(apiResponse: any): Movie[] {
  return apiResponse.results.map(
    (movie: any): Movie => ({
      id: movie.id,
      backdrop_path: movie.backdrop_path,
      language: movie.original_language,
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      rating: movie.vote_average,
    })
  );
}

export const mapResponseToMovie = (data: any): MovieDetails => {
  return {
    adult: data.adult,
    backdrop_path: data.backdrop_path ? data.backdrop_path : null,
    genres: data.genres.map(
      (genre: any): Genre => ({
        id: genre.id,
        name: genre.name,
      })
    ),
    id: data.id,
    imdb_id: data.imdb_id,
    language: data.original_language,
    title: data.title,
    overview: data.overview,
    poster_path: data.poster_path ? data.poster_path : null,
    release_date: data.release_date,
    runtime: data.runtime,
    status: data.status,
    tagline: data.tagline,
    rating: data.vote_average,
    trailerKey: null,
  };
};

export const mapMovieCredits = (data: any): MovieCredits => {
  return {
    id: data.id,
    cast: data.cast.map(
      (cast: any): CastMember => ({
        id: cast.id,
        name: cast.name,
        profile_path: cast.profile_path ? cast.profile_path : null,
        cast_id: cast.cast_id,
        character: cast.character,
        credit_id: cast.credit_id,
      })
    ),
  };
};

export const mapSimilarMovies = (data: any): SimilarMovies => {
  return {
    id: data.id,
    results: data.results.map(
      (movie: any): Movie => ({
        id: movie.id,
        backdrop_path: movie.backdrop_path ? movie.backdrop_path : null,
        language: movie.original_language,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path ? movie.poster_path : null,
        rating: movie.vote_average,
      })
    ),
  };
};

export const mapMovieVideos = (data: any): MovieVideos => {
  return {
    id: data.id,
    results: data.results.map(
      (video: any): VideoResult => ({
        name: video.name,
        key: video.key,
        size: video.size,
        type: video.type,
        published_at: video.published_at,
        id: video.id,
      })
    ),
  };
};
