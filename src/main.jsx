import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import { GlobalStyles } from "./assets/styles/globalStyles";
import { ThemeDefault } from "./assets/styles/theme";
import { ThemeProvider } from "styled-components";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <ThemeProvider theme={ThemeDefault}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </QueryClientProvider>
);
