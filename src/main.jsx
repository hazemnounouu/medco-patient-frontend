import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext.jsx";
import DoctorContextProvider from "./context/DoctorContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <DoctorContextProvider>
        <App />
      </DoctorContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
