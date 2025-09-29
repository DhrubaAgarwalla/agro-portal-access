import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Farmer from "./pages/Farmer";
import Distributor from "./pages/Distributor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authUser, connectedAddress } = useAuthStore();
  
  if (!authUser || !connectedAddress) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Simplified Public Route Component
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { authUser, connectedAddress } = useAuthStore();
  
  // If already authenticated, let Auth.tsx handle the specific routing
  if (authUser && connectedAddress) {
    return <Navigate to="/home" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            } 
          />
          
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/farmer" 
            element={
              <ProtectedRoute>
                <Farmer />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/distributor" 
            element={
              <ProtectedRoute>
                <Distributor />
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;