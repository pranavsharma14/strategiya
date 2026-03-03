import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SubmitIdea from "../pages/SubmitIdea";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "submit", element: <SubmitIdea /> },
    ],
  },
]);
