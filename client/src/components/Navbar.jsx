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
  width: 100%;
  background-color: lightblue;
  display: flex;
  align-items: center;
  position: relative;
  border-bottom: 2px solid black;
`;

const Left = styled.h1`
  margin-left: 20px;
  font-size: 25px;
  font-weight: bold;
  font-family: cursive;
  cursor: pointer;
  white-space: nowrap;     /* prevents line breaks */
`;

const Center = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  font-family: cursive;
  white-space: nowrap;     /* prevents line breaks */
`;

export default Navbar;
