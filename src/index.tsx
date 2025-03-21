import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}
