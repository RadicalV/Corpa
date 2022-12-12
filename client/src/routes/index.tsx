import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import Branches from "../pages/Branches";
import Corporations from "../pages/Corporations";
import Landing from "../pages/Landing";
import UserCorporations from "../pages/UserCorporations";
import Workers from "../pages/Workers";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/corporations" element={<Corporations />} />
      <Route path="/branches" element={<Branches />} />
      <Route path="/workers" element={<Workers />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/user/corporations" element={<UserCorporations />} />
    </Routes>
  );
};

export default Router;
