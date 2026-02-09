import { useState } from "react";
import styled, { keyframes } from "styled-components";
import Navbar from "../components/Navbar";
import Earth from "../components/Earth";
import { Link } from "react-router-dom";

const starDrift = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(-40px); }
`;

const handleTilt = (e) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * 5;
  const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * -5;

  card.style.setProperty("--rx", `${rotateX}deg`);
  card.style.setProperty("--ry", `${rotateY}deg`);
};

const resetTilt = (e) => {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
};

/* =======================
   DATA
======================= */
const packagesData = [
  { name: "Intergalactic Package", price: "$400,000", description: "Private cabin, zero-gravity lounge, orbital views." },
  { name: "Explorer Package", price: "$250,000", description: "Extended orbital travel with EVA training." },
  { name: "Mars Package", price: "$200,000", description: "Long-term Mars mission preparation." },
  { name: "Lunar Package", price: "$100,000", description: "Moon fly-by and Earthrise experience." },
  { name: "Orbital Package", price: "$50,000", description: "Low-Earth orbit orientation flight." },
  { name: "Facilities Package", price: "$1,000", description: "Astronaut training facility access." }
];

/* =======================
   COMPONENT
======================= */
const Home = () => {
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const closeModal = () => {
    setSelectedPackage(null);
    setFlippedIndex(null);
  };

  return (
    <Page>
      <Navbar />

      {/* HERO */}
      <Hero>
        <HeroText>
          <h1>Space travel for the future of humanity</h1>
          <p>Premium orbital experiences designed for pioneers.</p>
          <CTA>Explore Packages</CTA>
        </HeroText>

        <HeroVisual>
            <Stars />
            <Earth />
          
        </HeroVisual>
      </Hero>

      {/* PACKAGES */}
      <PackagesGrid>
        {packagesData.map((pkg, index) => (
          <PackageCard
            key={index}
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            onClick={() =>
              flippedIndex === index
                ? setSelectedPackage(pkg)
                : setFlippedIndex(index)
            }
          >
            <CardInner flipped={flippedIndex === index}>
              <CardFront>
                <Title>{pkg.name}</Title>
                <Price>{pkg.price}</Price>
              </CardFront>

              <CardBack>
                <p>{pkg.description}</p>
                <small>Click again for details</small>
              </CardBack>
            </CardInner>
          </PackageCard>
        ))}
      </PackagesGrid>

      {selectedPackage && (
        <ModalOverlay onClick={closeModal}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <h2>{selectedPackage.name}</h2>
            <Price>{selectedPackage.price}</Price>
            <p>{selectedPackage.description}</p>
            <CloseButton onClick={closeModal}>Close</CloseButton>
            <BuyButton to="/packages">Buy</BuyButton>
          </Modal>
        </ModalOverlay>
      )}
      <Page2>
  <Container>
    {/* HERO */}
    <Hero2>
      <h1>
        Making space accessible through carefully designed travel experiences.
      </h1>
      <p>
        Space Travel Agency curates premium journeys beyond Earth — combining
        cutting-edge aerospace technology with unforgettable destinations.
      </p>
    </Hero2>

    {/* SPLIT SECTION */}
    <Split>
      <div>
        <h2>What We Offer</h2>
        <p>
          From low-Earth orbit flights to lunar fly-bys and Mars mission
          preparation, our packages are designed for explorers at every level.
        </p>
        <p>
          Each experience is built around safety, comfort, and once-in-a-lifetime
          views of the universe.
        </p>
      </div>

      <div>
        <h2>Our Philosophy</h2>
        <p>
          Space travel should feel extraordinary — not overwhelming. We focus
          on seamless preparation, expert guidance, and immersive experiences
          that let you focus on the journey.
        </p>
        <p>
          Every mission is intentional. Every detail matters.
        </p>
      </div>
    </Split>

    {/* SURFACE */}
    <Surface>
      <h2>Why Choose Space Travel Agency</h2>
      <List>
        <li>
          <span>🚀</span>
          <div>
            <strong>Curated destinations</strong>
            <p>
              Carefully designed packages ranging from orbital flights to deep
              space exploration.
            </p>
          </div>
        </li>

        <li>
          <span>🌍</span>
          <div>
            <strong>Unmatched perspectives</strong>
            <p>
              Experience Earth, the Moon, and beyond from viewpoints few will
              ever see.
            </p>
          </div>
        </li>

        <li>
          <span>🛰️</span>
          <div>
            <strong>Preparation & support</strong>
            <p>
              Training facilities, mission briefings, and expert-led guidance
              every step of the way.
            </p>
          </div>
        </li>
      </List>
    </Surface>
  </Container>
</Page2>
    </Page>
  );
};

export default Home;

/* =======================
   STYLES
======================= */

const Page = styled.div`
  min-height: 100vh;
  background: radial-gradient( #0b1d2d, #02060a 70%);
  color: white;
   width: 100%;
`;

/* HERO */
const Hero = styled.section`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  align-items: center;
  padding: 0px 40px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroText = styled.div`
  h1 {
    font-size: 44px;
    font-weight: 600;
    margin-bottom: 14px;
  }

  p {
    opacity: 0.85;
    max-width: 420px;
    font-size: 17px;
  }
`;

const CTA = styled.button`
  margin-top: 28px;
  padding: 14px 26px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  background: linear-gradient(135deg, #7aa9ff, #9bdcff);
  color: #02060a;
`;

/* VISUAL */
const HeroVisual = styled.div`
  position: relative;   /* 👈 REQUIRED */
  height: 320px;
  width: 320px;
  margin: auto;
  overflow: hidden;     /* keeps stars contained */

  @media (max-width: 900px) {
    height: 260px;
    width: 260px;
  }
`;


const Stars = styled.div`
  position: absolute;
  inset: -40px;
  background-image:
    radial-gradient(white 0.8px, transparent 0.8px),
    radial-gradient(white 0.6px, transparent 0.6px),
    radial-gradient(white 1px, transparent 1px);
  background-size:
    45px 45px,
    60px 60px,
    90px 90px;
  background-position:
    0 0,
    20px 35px,
    50px 10px;
  opacity: 0.35;
  animation: ${starDrift} 45s linear infinite;
  pointer-events: none;
`;


/* PACKAGES */
const PackagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  max-width: 980px;
  margin: 40px auto;
  padding: 0 24px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const PackageCard = styled.div`
  height: 140px;
  border-radius: 20px;
  cursor: pointer;
  background: rgba(68, 133, 176, 0.95);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);

  transform:
    perspective(900px)
    rotateX(var(--rx, 0deg))
    rotateY(var(--ry, 0deg));

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform:
      perspective(900px)
      translateY(-6px)
      rotateX(var(--rx, 0deg))
      rotateY(var(--ry, 0deg));

    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.35);
  }
`;

const CardInner = styled.div`
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
  transform: ${({ flipped }) => (flipped ? "rotateY(180deg)" : "rotateY(0)")};
`;

const CardFace = styled.div`
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CardFront = styled(CardFace)`
  transform: translateZ(20px);
`;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg) translateZ(20px);
  font-size: 14px;
  padding: 16px;
  text-align: center;
`;

const Title = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: #02060a;
`;

const Price = styled.div`
  margin-top: 8px;
  font-weight: 600;
  color: #02060a;
`;

/* MODAL */
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background: white;
  padding: 32px;
  border-radius: 20px;
  max-width: 420px;
  width: 90%;
  color: #02060a;
`;

const CloseButton = styled.button`
  margin-top: 22px;
  padding: 12px 18px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  background: #02060a;
  color: white;
`;
const Page2 = styled.div`
  min-height: 100vh;
  background: radial-gradient(circle at top, #0b1d2d, #02060a 70%);
  color: white;
  padding: 96px 24px;
`;

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;

const Hero2 = styled.section`
  max-width: 760px;

  h1 {
    font-size: 44px;
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    opacity: 0.85;
    line-height: 1.7;
  }
`;

const Split = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  margin-top: 96px;

  h2 {
    font-size: 26px;
    margin-bottom: 14px;
  }

  p {
    opacity: 0.85;
    line-height: 1.7;
    margin-bottom: 14px;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Surface = styled.section`
  margin-top: 96px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 24px;
  padding: 56px;

  h2 {
    font-size: 28px;
    margin-bottom: 32px;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    gap: 20px;
    margin-bottom: 28px;
    align-items: flex-start;
  }

  span {
    font-size: 22px;
    line-height: 1;
  }

  strong {
    display: block;
    margin-bottom: 4px;
  }

  p {
    opacity: 0.8;
    font-size: 15px;
    line-height: 1.6;
  }
`;
 const BuyButton = styled(Link)`
 background: black;
  color: white;
  padding: 10px 14px;
  margin-left: 70%;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
 `