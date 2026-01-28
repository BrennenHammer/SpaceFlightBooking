import styled from "styled-components";
import Navbar from "../components/Navbar";

import mugImg from "../assets/images/spacecoffee.jpg";
import shirtImg from "../assets/images/spacejacket.jpg";
import pantsImg from "../assets/images/spacepants.jpg";
import suitImg from "../assets/images/futurespacesuit.jpg";
import flameImg from "../assets/images/flamethrower.jpg";
import moonSandImg from "../assets/images/moonsands.jpg";
import marsSandImg from "../assets/images/marssand.jpg";

const products = [
  { name: "Orbit Coffee Mug", price: "$24", image: mugImg },
  { name: "Zero-G jacket", price: "$45", image: shirtImg },
  { name: "Mission Pants", price: "$70", image: pantsImg },
  { name: "Civilian Spacesuit", price: "$12,000", image: suitImg },
  { name: "Mars Flamethrower", price: "$3,500", image: flameImg },
  { name: "Moon Sand (Certified)", price: "$250", image: moonSandImg },
  { name: "Mars Sand (Rare)", price: "$400", image: marsSandImg },
];

const StorePage = () => {
  return (
    <Page>
      <Navbar />

      <Header>
        <h1>Mission Store</h1>
        <p>
          Official Space Travel Agency gear — engineered for Earth and beyond.
        </p>
      </Header>

      <Grid>
        {products.map((item) => (
          <Card key={item.name}>
            <ImageWrap>
              <img src={item.image} alt={item.name} />
            </ImageWrap>

            <Info>
              <h3>{item.name}</h3>
              <span>{item.price}</span>
              <Button>Add to Cart</Button>
            </Info>
          </Card>
        ))}
      </Grid>
    </Page>
  );
};

export default StorePage;
const Page = styled.div`
  min-height: 100vh;
  background: radial-gradient(circle at top, #0b1d2d, #02060a 70%);
  color: white;
  padding-bottom: 120px;
`;

const Header = styled.div`
  max-width: 900px;
  margin: 100px auto 80px;
  padding: 0 24px;

  h1 {
    font-size: 46px;
    margin-bottom: 12px;
  }

  p {
    opacity: 0.85;
    max-width: 600px;
    line-height: 1.6;
  }
`;

const Grid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: rgba(180, 220, 240, 0.06);
  backdrop-filter: blur(14px);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.4);
  }
`;

const ImageWrap = styled.div`
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Info = styled.div`
  padding: 18px;

  h3 {
    font-size: 17px;
    margin-bottom: 6px;
  }

  span {
    display: block;
    font-size: 15px;
    opacity: 0.8;
    margin-bottom: 14px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 0;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  background: linear-gradient(135deg, #7aa9ff, #9bdcff);
  color: #02060a;
  font-weight: 600;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;
