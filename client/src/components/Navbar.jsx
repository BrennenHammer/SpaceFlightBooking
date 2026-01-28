import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Nav>
        <Brand>Space Travel Agency</Brand>
        <MenuButton onClick={() => setOpen(!open)}>
          <span />
          <span />
          <span />
        </MenuButton>

        
      </Nav>

      <Overlay open={open} onClick={() => setOpen(false)} />

      <Menu open={open}>
         <MenuLink to="/" onClick={() => setOpen(false)}>
          Home
        </MenuLink>
        <MenuLink to="/about" onClick={() => setOpen(false)}>
          About
        </MenuLink>
        <MenuLink to="/packages" onClick={() => setOpen(false)}>
          Packages
        </MenuLink>
        <MenuLink to="/admin/signup" onClick={() => setOpen(false)}>
          Admin Signup
        </MenuLink>
        <MenuLink to="/store" onClick={() => setOpen(false)}>
          Store
        </MenuLink>
      </Menu>
    </>
  );
};

export default Navbar;const Nav = styled.nav`
  height: 7vh;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  padding-left: 24px;
  position: relative;
  z-index: 10;
`;

const Brand = styled.h1`
  font-size: 22px;
  font-weight: 600;
  white-space: nowrap;
`;

const MenuButton = styled.div`
  width: 22px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  margin-left: 70%;
  z-index: 11;

  span {
    height: 3px;
    width: 100%;
    background: white;
    border-radius: 4px;
    transition: 0.35s ease;
  }

  span:nth-child(1) {
    transform: ${({ open }) =>
      open ? "rotate(45deg) translate(6px, 6px)" : "none"};
  }

  span:nth-child(2) {
    opacity: ${({ open }) => (open ? 0 : 1)};
  }

  span:nth-child(3) {
    transform: ${({ open }) =>
      open ? "rotate(-45deg) translate(6px, -6px)" : "none"};
  }
    @media (max-width: 950px){
    margin-left: 60%;
    }

      @media (max-width: 700px){
    margin-left: 50%;
    }
      @media (max-width: 550px){
    margin-left: 30%;
    }
     @media (max-width: 400px){
    margin-left: 20%;
    }
`;


/* DARK OVERLAY */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(6, 12, 19, 0.45);
  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? "auto" : "none")};
  transition: opacity 0.3s ease;
  z-index: 9;
`;

/* SLIDE MENU */
const Menu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px;
  padding: 100px 32px;
  background: rgba(36, 52, 71, 0.98);
  backdrop-filter: blur(12px);
  transform: ${({ open }) =>
    open ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.35s ease;
  display: flex;
  flex-direction: column;
  gap: 28px;
  z-index: 10;
`;

const MenuLink = styled(Link)`
  font-size: 20px;
  font-weight: 500;
  color: white;
  text-decoration: none;

  &:hover {
    opacity: 0.75;
  }
`;
