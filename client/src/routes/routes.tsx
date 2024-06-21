import { createBrowserRouter } from "react-router-dom";
import { RootApp } from "../pages/RootApp";
import { Home } from "../pages/Home";
import LoginPage from "../pages/Login";

const route = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/",
    element: <RootApp />,
    children: [
      {
        index: true,
        element: <Home/>
      }
    ]
  }
]);

export { route }