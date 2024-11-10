import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
//in the .env file
//write the env variables : VITE_BACKEND_URL , VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_CLIENT_SECRET
//else it won't work


import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: `${BACKEND_URL}`,
});

const googleAuth = (code) => api.get(`/api/v1/auth/google?code=${code}`);

const useGoogleOauth = () => {
  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult.code);
        console.log(result.data);
        navigate("/");
      } else {
        console.error(authResult);
        throw new Error(authResult);
      }
    } catch (e) {
      console.error("Error while Google Login...", e);
    }
  };

  const googleLoginSignUp = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return { googleLoginSignUp };
};

export default useGoogleOauth;
