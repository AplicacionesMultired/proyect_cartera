import { createBrowserRouter } from "react-router-dom";
import { RootApp } from "../pages/RootApp";
import { Home } from "../pages/Home";

const route = createBrowserRouter([
  {
    path: "/",
    element: <RootApp />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  }
]);

export { route }