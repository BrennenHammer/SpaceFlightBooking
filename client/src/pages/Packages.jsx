import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import moonImg from "../assets/images/moon.jpg";
import marsImg from "../assets/images/mars.jpg";
import earthImg from "../assets/images/earth.jpg";
import deepSpaceImg from "../assets/images/deep-space.jpg";
import orbitImg from "../assets/images/orbit.jpg";
import facilityImg from "../assets/images/facility.jpg";
import { useSearchParams } from "react-router-dom";

const packages = [
  {
    name: "Intergalactic Package",
    price: "$400,000",
    mission: "Deep Space Luxury Voyage",
    image: deepSpaceImg,
    details:
      "Private cabin, zero-gravity lounge, extended orbital duration, and uninterrupted deep-space observation windows.",
    meeting: "Friday 6:00 PM",
  },
  {
    name: "Explorer Package",
    price: "$250,000",
    mission: "Extended Orbital Exploration",
    image: earthImg,
    details:
      "Multi-day orbital mission including EVA simulations, advanced astronaut training, and panoramic Earth views.",
    meeting: "Saturday 2:00 PM",
  },
  {
    name: "Mars Package",
    price: "$200,000",
    mission: "Mars Mission Preparation",
    image: marsImg,
    details:
      "Long-duration flight simulation, surface operation training, and deep-space navigation experience.",
    meeting: "Tuesday 7:30 PM",
  },
  {
    name: "Lunar Package",
    price: "$100,000",
    mission: "Moon Fly-by Experience",
    image: moonImg,
    details:
      "Close lunar orbit, Earthrise viewing, and guided mission briefing by aerospace professionals.",
    meeting: "Thursday 5:00 PM",
  },
  {
    name: "Orbital Package",
    price: "$50,000",
    mission: "Low-Earth Orbit Flight",
    image: orbitImg,
    details:
      "Short-duration orbital flight with zero-gravity experience and Earth observation.",
    meeting: "Monday 6:15 PM",
  },
  {
    name: "Facilities Package",
    price: "$1,000",
    mission: "Astronaut Training Access",
    image: facilityImg,
    details:
      "Full-day access to astronaut preparation facilities, zero-G simulations, and mission planning labs.",
    meeting: "Wednesday 4:00 PM",
  },
];

const PackagesPage = () => {
  const [searchParams] = useSearchParams();
  const selectedName = searchParams.get("pkg");
  const [selectedPkg, setSelectedPkg] = useState(null);
  const refs = useRef({});

  useEffect(() => {
    if (!selectedName) return;
    const el = refs.current[selectedName];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedName]);

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
        {packages.map((pkg, index) => {
          const focused = selectedName === pkg.name;

          return (
            <Card
              key={pkg.name}
              reverse={index % 2 !== 0}
              $focused={focused}
              ref={(node) => (refs.current[pkg.name] = node)}
            >
              <Info>
                <h2>{pkg.name}</h2>
                <span>{pkg.mission}</span>
                <Price>{pkg.price}</Price>

                <Details>
                  <p>{pkg.details}</p>
                </Details>

                <BuyRow>
                  <BuyButton onClick={() => setSelectedPkg(pkg)}>
                    Buy
                  </BuyButton>
                  {focused && <Tag>Selected from Home</Tag>}
                </BuyRow>
              </Info>

              <ImageWrapper>
                <img src={pkg.image} alt={pkg.name} />
              </ImageWrapper>
            </Card>
          );
        })}
      </Grid>

      {selectedPkg && (
        <ModalOverlay onClick={() => setSelectedPkg(null)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <h2>{selectedPkg.name}</h2>
            <ModalPrice>{selectedPkg.price}</ModalPrice>
            <p>{selectedPkg.details}</p>

            <ScheduleBox>
              <strong>Scheduled Consultation</strong>
              <p>
                Mission briefing call:{" "}
                <b>{selectedPkg.meeting}</b>
              </p>
              <small>
                We’ll confirm your time zone and send a calendar invite.
              </small>
            </ScheduleBox>

            <ModalActions>
              <Primary onClick={() => setSelectedPkg(null)}>
                Confirm
              </Primary>
              <Ghost onClick={() => setSelectedPkg(null)}>
                Close
              </Ghost>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      )}
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
    max-width: 360px;
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
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  ${({ $focused }) =>
    $focused &&
    `
    transform: scale(1.04);
    box-shadow: 0 22px 60px rgba(0,0,0,0.45);
    border: 1px solid rgba(155, 220, 255, 0.35);
  `}

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
    font-size: 13px;
    opacity: 0.7;
  }
`;

const Price = styled.div`
  font-size: 22px;
  font-weight: 800;
  margin-top: 6px;
`;

const Details = styled.div`
  p {
    font-size: 14px;
    line-height: 1.5;
    opacity: 0.85;
    margin-top: 6px;
  }
`;

const BuyRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 14px;
`;

const BuyButton = styled.button`
  padding: 10px 14px;
  border-radius: 12px;
  border: none;
  font-weight: 800;
  cursor: pointer;
  background: linear-gradient(135deg, #7aa9ff, #9bdcff);
  color: #02060a;
`;

const Tag = styled.div`
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(155, 220, 255, 0.12);
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/* MODAL */

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background: white;
  color: #02060a;
  padding: 28px;
  border-radius: 22px;
  max-width: 520px;
  width: 100%;
`;

const ModalPrice = styled.div`
  font-size: 22px;
  font-weight: 800;
  margin: 8px 0;
`;

const ScheduleBox = styled.div`
  margin-top: 16px;
  padding: 14px;
  border-radius: 16px;
  background: rgba(2, 6, 10, 0.06);
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 18px;
`;

const Primary = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 14px;
  border: none;
  font-weight: 800;
  background: #02060a;
  color: white;
`;

const Ghost = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 14px;
  border: 1px solid rgba(2, 6, 10, 0.18);
  background: transparent;
  font-weight: 800;
`;
