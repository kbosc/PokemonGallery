import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import { GlobalStyles } from "./assets/styles/globalStyles";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <GlobalStyles />
      <App />
    </React.StrictMode>
  </QueryClientProvider>
);
