import { createContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase.init";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const registerUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const signInUser = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logOut = () => signOut(auth);
  const updateUserProfile = (user, profile) => updateProfile(user, profile);
  const forgotPassword = (email) => sendPasswordResetEmail(auth, email);

  return (
    <AuthContext.Provider value={{ user, registerUser, signInUser, logOut, updateUserProfile, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
