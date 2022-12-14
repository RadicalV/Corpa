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
      <Route
        path="/corporations/:corporationId/branches"
        element={<Branches />}
      />
      <Route
        path="/corporations/:corporationId/branches/:branchId/workers"
        element={<Workers />}
      />
      <Route path="/user/:id/corporations" element={<UserCorporations />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

export default Router;
