import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { CreateTripPage } from "./features/createTrip/containers/CreateTripPage";
import { TripDetailsPage } from "./features/tripDetails/containers/TripDetailsPage";
import { NotFound } from "./features/error/NotFound";
import { TripNotFound } from "./features/error/TripNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage/>,
  },
  {
    path: "/trips/:tripId",
    element: <TripDetailsPage/>,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/tripnotfound",
    element: <TripNotFound />,
  }
]);

export function App() {
  return <RouterProvider router={router} />
}