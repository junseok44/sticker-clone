import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { todoStore } from "./store";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { createRoutesFromElements } from "react-router";
import MemoHome from "./MemoHome";
import MemoDetailPage from "./MemoDetailPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App store={new todoStore()} />}>
      <Route path="/" element={<MemoHome></MemoHome>}></Route>
      <Route
        path=":category"
        element={<MemoDetailPage></MemoDetailPage>}
      ></Route>
    </Route>
  )
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
