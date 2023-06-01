import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authUser } from "../redux/actions";
import AuthService from "../services/AuthService";

const authService = new AuthService();

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // authService.logOut().then(res => console.log(res.data))
    auth();
  }, []);

  async function auth() {
    // this will keep the user state updated. Because the user is logged in, an action will be dispatched
    try {
      setLoading(true);
      //   console.log("isLogged in value is:#@#@#@", await authService.isLogged());
      if (await authService.isLogged()) {
        await dispatch(authUser());
        setIsAuthenticated(true);
        setLoading(false);

        return;
      }
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        setIsAuthenticated(false);
        dispatch(authUser());
      }, 3000);
    }
  }
  return {
    loading,
    isAuthenticated,
  };
};
