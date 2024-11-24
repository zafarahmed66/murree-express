import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./layouts/protected-route";
import RegisterPage from "./pages/auth/register";
import { LoginPage } from "./pages/auth/login";
import DashboardPage from "./pages/dashboard";
import Classroom from "./pages/classroom/classroom";
import Activities from "./pages/activities/activites";
import Learning from "./pages/learning/learning";
import PublicRoute from "./layouts/public-route";
import MainLayout from "./layouts/main-layout";
import Profile from "./pages/profile/profile";

// Define the routes
const router = createBrowserRouter([
  {
    path: "/register",
    element: <PublicRoute element={<RegisterPage />} />,
  },
  {
    path: "/login",
    element: <PublicRoute element={<LoginPage />} />,
  },
  {
    path: "/",
    element: <ProtectedRoute element={<MainLayout />} />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "/classroom",
        element: <Classroom />,
      },
      {
        path: "/activities",
        element: <Activities />,
      },
      {
        path: "/learning",
        element: <Learning />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
