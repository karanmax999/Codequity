import { useLocation } from "wouter";
import { useEffect } from "react";

export default function Admin() {
  const [, navigate] = useLocation();

  useEffect(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
        <p className="text-muted-foreground">
          This page is temporarily under maintenance.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Please use the login page to access the application.
        </p>
      </div>
    </div>
  );
}