import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);
  const toggleSignup = () => setIsSignup(prev => !prev);

  return (
    <AuthContext.Provider
      value={{
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        isSignup,
        toggleSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
