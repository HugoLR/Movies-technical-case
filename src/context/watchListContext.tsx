import { createContext, useCallback, useMemo } from "react";

import useLocalStorage from "~hooks/useLocalStorage";
import { IMovie } from "~hooks/useFetchMovies";

export interface IWatchListContext {
  watchList: IMovie[] | [];
  saveMovie: (movie: IMovie) => void;
  updateWatchList: (id: number) => void;
}

const localStorageKey = "watchList";

export const WatchListContext = createContext<IWatchListContext | null>(null);

function WatchListProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
  const [watchList, setWatchList] = useLocalStorage(localStorageKey, []);

  const saveMovie = useCallback(
    (movie: IMovie) => {
      setWatchList((prevWatchList: IMovie[] | []) => [...prevWatchList, movie]);
    },
    [setWatchList]
  );

  const updateWatchList = useCallback(
    (id: number) => {
      const newWatchList = watchList.filter((movie: IMovie) => movie.id !== id);
      setWatchList(newWatchList);
    },
    [watchList, setWatchList]
  );

  const value = useMemo(() => ({ watchList, saveMovie, updateWatchList }), [watchList, saveMovie, updateWatchList]);

  return <WatchListContext.Provider value={value}>{children}</WatchListContext.Provider>;
}

export default WatchListProvider;
