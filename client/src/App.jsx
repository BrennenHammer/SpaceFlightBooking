import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Packages from "./pages/Packages";
import Store from "./pages/Store";

import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import AdminAppointments from "./pages/AdminAppointments";
import AdminLogin from "./pages/AdminLogin";
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

      {/* Protected Admin */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/appointments"
        element={
          <AdminProtectedRoute>
            <AdminAppointments />
          </AdminProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
