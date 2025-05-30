import { createContext, useState, useCallback, useEffect } from "react";

export const AuthContext = createContext({
  token: null,
  isLoggedIn: false,
  userId: null,
  image: null,
  login: (userId, token) => {},
  logout: () => {},
  isAdmin: false,
});

const getUserData = () => {
  let userData = {
    token: null,
    userId: null,
    image: null,
  };

  try {
    const localStorageResult = JSON.parse(localStorage.getItem("patientData"));

    if (localStorageResult) {
      userData = localStorageResult;
    }
  } catch (error) {
    console.error(error);
  }

  return userData;
};

const AuthContextProvider = ({ children }) => {
  const [userSession, setUserSession] = useState(getUserData());
  const { token, userId, image } = userSession;

  const login = useCallback((userId, token, image) => {
    setUserSession({
      token,
      userId,
      image,
    });
    localStorage.setItem(
      "patientData",
      JSON.stringify({
        userId,
        token,
        image,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setUserSession({
      token: null,
      userId: null,
      image: null,
    });
    localStorage.removeItem("patientData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("patientData"));
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token, storedData.image);
    }
  }, [login]);

  const value = {
    isLoggedIn: !!token,
    token,
    userId,
    image,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
