export interface Movie {
  id: number;
  backdrop_path: string | null;
  language: string;
  title: string;
  overview: string;
  poster_path: string | null;
  rating: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  genres: Genre[];
  id: number;
  imdb_id: string;
  language: string;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  runtime: number;
  status: string;
  tagline: string;
  rating: number;
  trailerKey: string | null;
}

export interface CastMember {
  id: number;
  name: string;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
}

export interface MovieCredits {
  id: number;
  cast: CastMember[];
}

export interface SimilarMovies {
  id: number;
  results: Movie[];
}

export interface VideoResult {
  name: string;
  key: string;
  size: number;
  type: string;
  published_at: string;
  id: string;
}

export interface MovieVideos {
  id: number;
  results: VideoResult[];
}
