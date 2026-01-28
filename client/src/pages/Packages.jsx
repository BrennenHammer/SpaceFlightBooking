import styled from "styled-components";
import Navbar from "../components/Navbar";
import moonImg from "../assets/images/moon.jpg";
import marsImg from "../assets/images/mars.jpg";
import earthImg from "../assets/images/earth.jpg";
import deepSpaceImg from "../assets/images/deep-space.jpg";
import orbitImg from "../assets/images/orbit.jpg";
import facilityImg from "../assets/images/facility.jpg";

const packages = [
  {
    name: "Intergalactic Package",
    price: "$400,000",
    mission: "Deep Space Luxury Voyage",
    image: deepSpaceImg,
    details:
      "Private cabin, zero-gravity lounge, extended orbital duration, and uninterrupted deep-space observation windows.",
  },
  {
    name: "Explorer Package",
    price: "$250,000",
    mission: "Extended Orbital Exploration",
    image: earthImg,
    details:
      "Multi-day orbital mission including EVA simulations, advanced astronaut training, and panoramic Earth views.",
  },
  {
    name: "Mars Package",
    price: "$200,000",
    mission: "Mars Mission Preparation",
    image: marsImg,
    details:
      "Long-duration flight simulation, surface operation training, and deep-space navigation experience.",
  },
  {
    name: "Lunar Package",
    price: "$100,000",
    mission: "Moon Fly-by Experience",
    image: moonImg,
    details:
      "Close lunar orbit, Earthrise viewing, and guided mission briefing by aerospace professionals.",
  },
  {
    name: "Orbital Package",
    price: "$50,000",
    mission: "Low-Earth Orbit Flight",
    image: orbitImg,
    details:
      "Short-duration orbital flight with zero-gravity experience and Earth observation.",
  },
  {
    name: "Facilities Package",
    price: "$1,000",
    mission: "Astronaut Training Access",
    image: facilityImg,
    details:
      "Full-day access to astronaut preparation facilities, zero-G simulations, and mission planning labs.",
  },
];

const PackagesPage = () => {
  return (
    <Page>
      <Navbar />

      <Header>
        <h1>Mission Packages</h1>
        <p>
          Carefully designed journeys beyond Earth — built for explorers,
          pioneers, and future astronauts.
        </p>
      </Header>

      <Grid>
        {packages.map((pkg, index) => (
          <Card key={pkg.name} reverse={index % 2 !== 0}>
            <Info>
              <h2>{pkg.name}</h2>
              <span>{pkg.mission}</span>
              <Price>{pkg.price}</Price>
              <Details>
                <p>{pkg.details}</p>
              </Details>
            </Info>

            <ImageWrapper>
              <img src={pkg.image} alt={pkg.name} />
            </ImageWrapper>
          </Card>
        ))}
      </Grid>
    </Page>
  );
};

export default PackagesPage;

/* ================= STYLED COMPONENTS ================= */

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
    margin-bottom: 14px;
  }

  p {
    opacity: 0.85;
    line-height: 1.6;
    max-width: 600px;
  }
`;

const Grid = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 600px;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    max-width: 300px;
  }
`;

const Card = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 22px;
  overflow: hidden;
  background: rgba(180, 220, 240, 0.05);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  max-height: 300px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  ${({ reverse }) =>
    reverse &&
    `
    direction: rtl;
  `}

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    direction: ltr;
    max-height: none;
  }
`;

const Info = styled.div`
  padding: 16px;

  h2 {
    font-size: 20px;
    margin-bottom: 4px;
  }

  span {
    display: block;
    font-size: 13px;
    opacity: 0.7;
    margin-bottom: 10px;
  }
`;

const Price = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-top: 6px;
`;

const Details = styled.div`
  p {
    line-height: 1.5;
    font-size: 14px;
    opacity: 0.85;
    margin-top: 6px;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
