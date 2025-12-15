import axios from "axios";
import { getAuth } from "firebase/auth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000", // server port check
});

axiosSecure.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosSecure;
