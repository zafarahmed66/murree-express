import { useAuth } from "../context/auth-context";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import NavbarSidebarLayout from "./navbar-sidebar";

export default function ProtectedRoute({ element }: { element: ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <NavbarSidebarLayout>
      <div className="px-4 pt-6">{element}</div>
    </NavbarSidebarLayout>
  ) : (
    <Navigate to="/login" replace />
  );
}
