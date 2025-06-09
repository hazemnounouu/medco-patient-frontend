// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const [state, setState] = useState("Sign Up");

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [gender, setGender] = useState("");

//   const navigate = useNavigate();
//   const { login, token } = useContext(AuthContext);

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     if (state === "Sign Up") {
//       const { data } = await axios.post(backendUrl + "/api/patient/register", {
//         name,
//         email,
//         password,
//         gender,
//       });

//       if (data.success) {
//         const userId = data.user._id;
//         const image = data.user.image;
//         const token = data.token;
//         login(userId, token, image);

//         navigate("/doctors");
//       } else {
//         toast.error(data.message);
//       }
//     } else {
//       const { data } = await axios.post(backendUrl + "/api/patient/login", {
//         email,
//         password,
//       });

//       if (data.success) {
//         const userId = data.user._id;
//         const image = data.user.image;
//         const token = data.token;
//         login(userId, token, image);

//         navigate("/doctors");
//       } else {
//         toast.error(data.message);
//       }
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       navigate("/");
//     }
//   }, [token]);

//   return (
//     <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
//       <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
//         <p className="text-2xl font-semibold">
//           {state === "Sign Up" ? "Create Account" : "Login"}
//         </p>
//         <p>
//           Please {state === "Sign Up" ? "sign up" : "log in"} to book
//           appointment
//         </p>
//         {state === "Sign Up" ? (
//           <div className="w-full ">
//             <p>Full Name</p>
//             <input
//               onChange={(e) => setName(e.target.value)}
//               value={name}
//               className="border border-[#DADADA] rounded w-full p-2 mt-1"
//               type="text"
//               required
//             />
//           </div>
//         ) : null}
//         <div className="w-full ">
//           <p>Email</p>
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             className="border border-[#DADADA] rounded w-full p-2 mt-1"
//             type="email"
//             required
//           />
//         </div>
//         <div className="w-full ">
//           <p>Password</p>
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             className="border border-[#DADADA] rounded w-full p-2 mt-1"
//             type="password"
//             required
//           />
//         </div>

//         {state === "Sign Up" ? (
//           <div className="w-full ">
//             <p>Gender</p>
//             <select
//               name="gender"
//               id="gender"
//               onChange={(e) => setGender(e.target.value)}
//               value={gender}
//               className="border border-[#DADADA] rounded w-full p-2 mt-1"
//               type="text"
//               required
//             >
//               <option value="">--Please choose an option--</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//             </select>
//           </div>
//         ) : null}

//         <button className="bg-primary text-white w-full py-2 my-2 rounded-md text-base">
//           {state === "Sign Up" ? "Create account" : "Login"}
//         </button>
//         {state === "Sign Up" ? (
//           <p>
//             Already have an account?{" "}
//             <span
//               onClick={() => setState("Login")}
//               className="text-primary underline cursor-pointer"
//             >
//               Login here
//             </span>
//           </p>
//         ) : (
//           <p>
//             Create an new account?{" "}
//             <span
//               onClick={() => setState("Sign Up")}
//               className="text-primary underline cursor-pointer"
//             >
//               Click here
//             </span>
//           </p>
//         )}
//       </div>
//     </form>
//   );
// };

// export default Login;

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [state, setState] = useState("Sign Up");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [gender, setGender] = useState("");

  const [isLoading, setIsLoading] = useState(false); // Loading indicator

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const validateForm = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email.");
      return false;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return false;
    }
    if (state === "Sign Up") {
      if (!firstName.trim()) {
        toast.error("First Name is required.");
        return false;
      }
      if (!lastName.trim()) {
        toast.error("Last Name is required.");
        return false;
      }
      // if (!nationalId.trim()) {
      //   toast.error("National Id is required.");
      //   return false;
      // }
      if (nationalId.length !== 14) {
        toast.error("National Id must be exactly 14 characters.");
        return false;
      }
      if (!gender) {
        toast.error("Please select a gender.");
        return false;
      }
    }
    return true;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true); // Start loading
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(
          backendUrl + "/api/patient/register",
          {
            firstName,
            lastName,
            email,
            password,
            gender,
          }
        );

        if (data.success) {
          const { _id: userId, image } = data.user;
          login(userId, data.token, image);
          navigate("/doctors");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/patient/login", {
          email,
          password,
        });

        if (data.success) {
          const { _id: userId, image } = data.user;
          login(userId, data.token, image);
          navigate("/doctors");
        } else {
          toast.error(data.message);
        }
      }
    } catch (err) {
      toast.error("Something went wrong. Try again later.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to book
          appointment
        </p>
        {state === "Sign Up" && (
          <>
            <div className="w-full">
              <p>First Name</p>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                className="border border-[#DADADA] rounded w-full p-2 mt-1"
                type="text"
              />
            </div>

            <div className="w-full">
              <p>Last Name</p>
              <input
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className="border border-[#DADADA] rounded w-full p-2 mt-1"
                type="text"
              />
            </div>
          </>
        )}
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
          />
        </div>

        {state === "Sign Up" && (
          <>
            <div className="w-full">
              <p>National Id</p>
              <input
                onChange={(e) => setNationalId(e.target.value)}
                value={nationalId}
                className="border border-[#DADADA] rounded w-full p-2 mt-1"
                type="text"
              />
            </div>

            <div className="w-full">
              <p>Gender</p>
              <select
                name="gender"
                id="gender"
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                className="border border-[#DADADA] rounded w-full p-2 mt-1"
              >
                <option value="">--Please choose an option--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`bg-primary text-white w-full py-2 my-2 rounded-md text-base ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading
            ? "Please wait..."
            : state === "Sign Up"
            ? "Create account"
            : "Login"}
        </button>

        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
