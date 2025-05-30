import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  // const [token, setToken] = useState(
  //   localStorage.getItem("token") ? localStorage.getItem("token") : ""
  // );
  // const [userData, setUserData] = useState(false);

  // Getting Doctors using API
  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Getting User Profile using API
  // const loadUserProfileData = async () => {
  //   try {
  //     const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
  //       headers: { token },
  //     });

  //     if (data.success) {
  //       setUserData(data.userData);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.message);
  //   }
  // };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // useEffect(() => {
  //   if (token) {
  //     loadUserProfileData();
  //   }
  // }, [token]);

  const value = {
    doctors,
    fetchDoctors,
    currencySymbol,
    backendUrl,
    // token,
    // setToken,
    // userData,
    // setUserData,
    // loadUserProfileData,
  };

  return (
    <DoctorContext.Provider value={value}>{props.children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
