import { createBrowserRouter } from "react-router-dom";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";
import ReportFraud from "@/pages/ReportFraud";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/reportar-estafa",
    element: <ReportFraud />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
