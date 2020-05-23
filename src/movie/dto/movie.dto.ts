import { MovieGenres } from "../types/movie.enums";

export interface MovieDto {
  genres: Genre[];
  production_countries: ProductionCountry[];
  production_companies: ProductionCompany[];
  spoken_languages: Language[];
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: any;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface Genre {
  id: number;
  name: MovieGenres;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface Language {
  iso_639_1: string;
  name: string;
}
