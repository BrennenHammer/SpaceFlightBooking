import { Routes, Route } from "react-router-dom";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Packages from "./pages/Packages";
import Store from './pages/Store'
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/store" element={<Store />} />

      {/* Admin Auth */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/signup" element={<AdminSignup />} />

      {/* Protected Admin */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
