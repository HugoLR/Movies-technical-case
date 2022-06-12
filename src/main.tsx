import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "~app/App";
import WatchListProvider from "~context/watchListContext";

import "./index.css";
import "./reset.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <WatchListProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </WatchListProvider>
  </HelmetProvider>
);
