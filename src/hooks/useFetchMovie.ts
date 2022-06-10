import { useEffect, useState } from "react";

import api from "~app/api";

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | {};
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: { name: string; id: number; logo_path: string | null; origin_country: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  revenue: number;
  runtime: number | null;
  spoken_languages: { iso_639_1: string; name: string }[];
  status: string;
  tagline: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
interface IResponse {
  movie: IMovie | null;
  loading: boolean;
  error: null | string;
}

const endpoint = "/movie";
const defaultConfig = {
  params: {
    language: "es-ES",
  },
};

const useFetchMovie = (id: string): IResponse => {
  const [movie, setMovie] = useState<null | IMovie>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchEndpoint = async () => {
      try {
        const response = await api.get(`${endpoint}/${id}`, defaultConfig);
        setLoading(false);
        setMovie(response.data);
      } catch (_error) {
        setLoading(false);
        setError("Error fetching API data");
      }
    };

    fetchEndpoint();
  }, [id]);

  return { movie, error, loading };
};

export default useFetchMovie;
