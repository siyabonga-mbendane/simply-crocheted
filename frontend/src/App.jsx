import { Box, useColorModeValue} from "@chakra-ui/react";
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage"; // Add this import
import { Navbar } from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useUserStore } from "./users/user";

function App() {
  const { isAuthenticated } = useUserStore();
  
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar/>
      <Routes>
        {/* Landing page is the default route */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth page */}
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Home page (for browsing items) */}
        <Route path="/shop" element={<HomePage/>} />
        
        {/* Protected Routes */}
        <Route path="/create" element={
          <ProtectedRoute requireAdmin={true}>
            <CreatePage/>
          </ProtectedRoute>
        } />
        
        {/* Redirect authenticated users to shop, non-authenticated to landing */}
        <Route 
          path="*" 
          element={<Navigate to={isAuthenticated ? "/shop" : "/"} />} 
        />
      </Routes>
    </Box>
  );
}

export default App;

