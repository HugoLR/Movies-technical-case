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

interface IServiceResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

interface IResponse {
  data: IServiceResponse | null;
  loading: boolean;
  error: null | string;
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

const useFetchMovies = (): IResponse => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchEndpoint = async () => {
      try {
        const response = await api.get(endpoint, defaultConfig);
        setLoading(false);
        setData(response.data);
      } catch (_error) {
        setLoading(false);
        setError("Error fetching API data");
      }
    };

    fetchEndpoint();
  }, []);

  return { data, error, loading };
};

export default useFetchMovies;
