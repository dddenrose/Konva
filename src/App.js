import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DrawGround from "./container/DrawGround/DrawGround";
import Homepage from "./container/Homepage/Homepage";
import OutletContextProvider from "./store/outletStore";
import CircleGround from "./container/CircleGround/CircleGround";
import "./App.css";
import RectGround from "./container/RectGround/RectGround";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
      children: [
        {
          path: "/drawGround",
          element: <DrawGround />,
        },
        {
          path: "/cirlceGround",
          element: <CircleGround />,
        },
        {
          path: "/rectGround",
          element: <RectGround />,
        },
      ],
    },
  ]);

  return (
    <OutletContextProvider>
      <RouterProvider router={router} />
    </OutletContextProvider>
  );
}

export default App;
