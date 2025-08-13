import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PopularMovies from "./pages/PopularMovies";
import TopRatedMovies from "./pages/TopRatedMovies";
import UpComingMovies from "./pages/UpComingMovies";
import People from "./pages/People";
import AuthModal from "./components/AuthModal";

function AppContent() {
  const { isAuthModalOpen, closeAuthModal, isSignup, toggleSignup } = useAuth();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<PopularMovies />} />
        <Route path="/topRatedMovies" element={<TopRatedMovies />} />
        <Route path="/upComingMovies" element={<UpComingMovies />} />
        <Route path="/people" element={<People />} />
      </Routes>
      <Footer />

      {isAuthModalOpen && (
        <AuthModal
          isSignup={isSignup}
          setIsSignup={toggleSignup}
          closeModal={closeAuthModal}
        />
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
