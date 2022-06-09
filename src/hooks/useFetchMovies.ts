import { useEffect, useState } from "react";

import api from "~app/api";

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
interface IResponse {
  movies: IMovie[] | null;
  loading: boolean;
  error: null | string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  paginationLoading: boolean;
}

const endpoint = "/discover/movie";
const defaultConfig = {
  params: {
    sort_by: "vote_average.desc",
    page: 1,
    language: "es-ES",
    region: "MX",
    "vote_count.gte": 100,
  },
};
const initialPage = 1;

const useFetchMovies = (): IResponse => {
  const [movies, setMovies] = useState<null | IMovie[]>(null);
  const [loading, setLoading] = useState(true);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    const fetchEndpoint = async () => {
      try {
        const response = await api.get(endpoint, defaultConfig);
        setLoading(false);
        setMovies(response.data.results);
      } catch (_error) {
        setLoading(false);
        setError("Error fetching API data");
      }
    };

    fetchEndpoint();
  }, []);

  useEffect(() => {
    if (page === initialPage) {
      return;
    }

    const fetchEndpoint = async () => {
      try {
        setPaginationLoading(true);
        const response = await api.get(endpoint, {
          params: {
            ...defaultConfig.params,
            page,
          },
        });
        setMovies((prevMovies) => {
          const newMovies = response.data.results;
          if (!prevMovies) {
            return newMovies;
          }

          return [...prevMovies, ...newMovies];
        });
        setPaginationLoading(false);
      } catch (_error) {
        setPaginationLoading(false);
        setError("Error fetching API data");
      }
    };

    fetchEndpoint();
  }, [page]);

  return { movies, error, loading, setPage, paginationLoading };
};

export default useFetchMovies;
