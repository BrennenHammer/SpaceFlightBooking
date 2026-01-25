import styled from "styled-components";

const Navbar = () => {
  return (
    <Nav>
      <Left>Space Travel Agency</Left>
      <Center>Book your space travel!</Center>
    </Nav>
  );
};

const Nav = styled.nav`
  height: 7vh;
  width: 103%;
  margin-top: -8px;
  margin-left: -8px;
  display: flex;
  align-items: center;
  position: relative;
`;

const Left = styled.h1`
  margin-left: 20px;
  font-size: 25px;
  font-weight: bold;
  margin-top: 25px;
  font-family: sans-serif;
  cursor: pointer;
  white-space: nowrap;     /* prevents line breaks */
`;

const Center = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  margin-top: 7px;
  white-space: nowrap;     /* prevents line breaks */
`;

export default Navbar;
