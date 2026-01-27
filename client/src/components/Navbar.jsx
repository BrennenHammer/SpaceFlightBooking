import styled from "styled-components";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Nav>
      <Left>Space Travel Agency</Left>

      <Right>
        <NavLink to="/about">About</NavLink>
      </Right>
    </Nav>
  );
};

export default Navbar;


const Nav = styled.nav`
  height: 7vh;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
`;

const Left = styled.h1`
  margin-left: 40px;
  font-size: 25px;
  font-weight: bold;
  font-family: sans-serif;
  white-space: nowrap;
`;

const Right = styled.div`
  margin-left: auto;
  margin-right: 40px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    opacity: 0.8;
  }
`;
