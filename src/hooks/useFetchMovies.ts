import { useEffect, useState } from "react";

import api from "~app/api";
import useLocalStorage from "./useLocalStorage";

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
  movies: IMovie[] | [];
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
const localStorageKey = "movies";
const localStoragePageKey = initialPage;

const useFetchMovies = (): IResponse => {
  const [moviesFromLocalStorage, storeMoviesInLocalStorage] = useLocalStorage(localStorageKey, []);
  const [pageFromLocalStorage, storePageInLocalStorage] = useLocalStorage(String(localStoragePageKey), initialPage);
  const [loading, setLoading] = useState(() => !(moviesFromLocalStorage.length > 0));
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [page, setPage] = useState(() => Number(pageFromLocalStorage));

  useEffect(() => {
    const fetchEndpoint = async () => {
      try {
        const response = await api.get(endpoint, defaultConfig);
        setLoading(false);
        storeMoviesInLocalStorage(response?.data?.results);
      } catch (_error) {
        setLoading(false);
        setError("Error fetching API data");
      }
    };

    if (moviesFromLocalStorage.length === 0) {
      fetchEndpoint();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchEndpoint = async () => {
      try {
        setPaginationLoading(true);
        const response = await api.get(endpoint, {
          params: {
            ...defaultConfig.params,
            page,
          },
        });
        storeMoviesInLocalStorage((prevMovies: IMovie[]) => {
          const newMovies = [...prevMovies, ...response.data.results];
          return newMovies;
        }, page > 2);
        if (page <= 2) {
          storePageInLocalStorage(page);
        }
        setPaginationLoading(false);
      } catch (_error) {
        setPaginationLoading(false);
        setError("Error fetching API data");
      }
    };

    if (page !== pageFromLocalStorage) {
      fetchEndpoint();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return { movies: moviesFromLocalStorage, error, loading, setPage, paginationLoading };
};

export default useFetchMovies;
