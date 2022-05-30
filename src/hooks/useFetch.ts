import { useEffect, useState } from "react";
// import { ApiSearchRequest } from "@/types/api/request";
// import { ApiSearchResponse } from "@/types/api/response";
// import { DC_API_SEARCH_URL } from "@/lib/endpoints";
// import { UserFacets } from "@/types/search-context";
// import { buildQuery } from "@/lib/queries/builder";

// type ApiData = ApiSearchResponse | null;
// type ApiError = string | null;
// type Response = {
//   data: ApiData;
//   error: ApiError;
//   loading: boolean;
// };

const useFetch = (endpoint: string): any => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchEndpoint = async () => {
      try {
        const response = await fetch(endpoint);
        const json = response.json();
        setLoading(false);
        setData(json);
      } catch (_error) {
        setLoading(false);
        setError("Error fetching API data");
      }
    };

    fetchEndpoint();
  }, [endpoint]);

  return { data, error, loading };
};

export default useFetch;
