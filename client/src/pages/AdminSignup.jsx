import styled from "styled-components";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const AdminSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // MOCK SIGNUP
    if (email && password) {
      localStorage.setItem("adminToken", "mock-admin-token");
      navigate("/admin/dashboard");
    }
  };

  return (
    <Page>
        <Navbar />
      <Card>
        <h1>Create Admin</h1>
        <p>Authorized personnel only</p>

        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit">Create Account</Button>
        </form>

        <Footer>
          <span>Already admin?</span>
          <Link to="/admin/login">Sign in</Link>
        </Footer>
      </Card>
    </Page>
  );
};

export default AdminSignup;
const Page = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: radial-gradient(circle at top, #0b1d2d, #02060a 70%);
  color: white;
`;

const Card = styled.div`
  width: 380px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(14px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
  text-align: center;

  h1 {
    font-size: 28px;
    margin-bottom: 8px;
  }

  p {
    opacity: 0.7;
    margin-bottom: 28px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  margin-bottom: 16px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 15px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #1e90ff, #6ea8ff);
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;

  &:hover {
    opacity: 0.9;
  }
`;

const Footer = styled.div`
  margin-top: 20px;
  font-size: 14px;
  opacity: 0.8;

  a {
    margin-left: 6px;
    color: #6ea8ff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
