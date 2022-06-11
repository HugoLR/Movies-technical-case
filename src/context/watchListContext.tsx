import { createContext, useCallback, useMemo, useState } from "react";
import { IMovie } from "~hooks/useFetchMovies";

export interface IWatchListContext {
  watchList: IMovie[] | [];
  saveMovie: (movie: IMovie) => void;
  updateWatchList: (id: number) => void;
}

export const WatchListContext = createContext<IWatchListContext | null>(null);

function WatchListProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
  const [watchList, setWatchList] = useState<IMovie[] | []>([]);

  const saveMovie = useCallback((movie: IMovie) => {
    setWatchList((prevWatchList) => [...prevWatchList, movie]);
  }, []);

  const updateWatchList = useCallback(
    (id: number) => {
      const newWatchList = watchList.filter((movie: IMovie) => movie.id !== id);
      setWatchList(newWatchList);
    },
    [watchList]
  );

  const value = useMemo(() => ({ watchList, saveMovie, updateWatchList }), [watchList, saveMovie, updateWatchList]);

  return <WatchListContext.Provider value={value}>{children}</WatchListContext.Provider>;
}

export default WatchListProvider;
