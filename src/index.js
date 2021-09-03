import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import vacationSlice from "./toolkitSlice/vacationSlice";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    vacation: vacationSlice,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
