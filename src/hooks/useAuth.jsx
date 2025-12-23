import { useContext, createContext, useState, useEffect } from "react";
import {
  auth,
  googleProvider
} from "../firebase/firebase.init";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Email/Password login
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google login
  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Forgot password
  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Email/Password register
  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signInUser,
        registerUser,
        loginWithGoogle,
        forgotPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
