import { useEffect, useState } from "react";

import api from "~app/api";
import useLocalStorage from "./useLocalStorage";

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

const localStorageKey = "Movie";

const useFetchMovie = (id: string): IResponse => {
  const [movieFromLocalStorage, storeMovieInLocalStorage] = useLocalStorage(localStorageKey, null);
  const [movie, setMovie] = useState<null | IMovie>(null);
  const [loading, setLoading] = useState(() => !(movieFromLocalStorage && movieFromLocalStorage?.id === Number(id)));
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchEndpoint = async () => {
      if (movieFromLocalStorage && movieFromLocalStorage?.id === Number(id)) {
        await Promise.resolve(setMovie(movieFromLocalStorage));
        return;
      }

      try {
        const response = await api.get(`${endpoint}/${id}`, defaultConfig);
        setMovie(response.data);
        storeMovieInLocalStorage(response.data);
        setLoading(false);
      } catch (_error) {
        setLoading(false);
        setError("Error fetching API data");
      }
    };

    fetchEndpoint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return { movie, error, loading };
};

export default useFetchMovie;
