
import { Navigate } from "react-router-dom";
import { isAdmin, isLoggedIn } from "@/lib/auth";

type AdminRouteProps = {
  element: React.ReactNode;
};

const AdminRoute = ({ element }: AdminRouteProps) => {
  // Check if user is logged in and is an admin
  const authorized = isLoggedIn() && isAdmin();
  
  // If authorized, return the element; otherwise, redirect to dashboard
  return authorized ? <>{element}</> : <Navigate to="/dashboard" replace />;
};

export default AdminRoute;
