import { render, RenderResult } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import MovieCard from "./MovieCard";
import WatchListProvider from "~context/watchListContext";

const mockMovie = {
  adult: false,
  backdrop_path: "/rBAdEeCqNYKx18G4MKtGHXlcPR6.jpg",
  genre_ids: [35],
  id: 529414,
  original_language: "es",
  original_title: "Franco Escamilla: Por La Anécdota",
  overview:
    "El comediante mexicano Franco Escamilla saca sus chistes de las experiencias de la vida real y está dispuesto a hacer cualquier cosa por el nuevo material. Él no tiene miedo de hacer generalizaciones sobre cómo los hombres se bañan. Pero tiene miedo de hablar con extraños. Especialmente en los funerales.",
  popularity: 18.463,
  poster_path: "/f4iwq1hkcAS9xkUGtpeDBVnhfFb.jpg",
  release_date: "2018-06-08",
  title: "Franco Escamilla: Por la Anécdota",
  video: false,
  vote_average: 9,
  vote_count: 102,
};

describe("<ForgottenPasswordForm />", () => {
  let component: RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement>;

  beforeEach(() => {
    component = render(
      <MemoryRouter>
        <WatchListProvider>
          <MovieCard movie={mockMovie} />
        </WatchListProvider>
      </MemoryRouter>
    );
  });

  it("should render component", () => {
    const card = component.container.querySelector("div[aria-hidden='true']");

    expect(card).toBeInTheDocument();
  });
});
