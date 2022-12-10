import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import Corporations from "../pages/Corporations";
import Landing from "../pages/Landing";
import UserCorporations from "../pages/UserCorporations";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/corporations" element={<Corporations />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/user/corporations" element={<UserCorporations />} />
    </Routes>
  );
};

export default Router;
