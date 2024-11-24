import { useAuth } from "../context/auth-context";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import FlowbiteWrapper from "./main-layout";

export default function PublicRoute({ element }: { element: ReactNode }) {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? (
    <>
      <FlowbiteWrapper />

      {element}
    </>
  ) : (
    <Navigate to="/" replace />
  );
}
