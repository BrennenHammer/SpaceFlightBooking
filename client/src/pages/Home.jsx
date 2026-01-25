import { useState } from "react";
import styled, { keyframes } from "styled-components";
import Navbar from "../components/Navbar";
import Earth from "../components/Earth";

/* =======================
   ANIMATIONS (SUBTLE ONLY)
======================= */
const starDrift = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(-40px); }
`;

/* =======================
   INTERACTIONS
======================= */
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
            <Earth />
          <Planet />
          <Stars />
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
          </Modal>
        </ModalOverlay>
      )}
    </Page>
  );
};

export default Home;

/* =======================
   STYLES
======================= */

const Page = styled.div`
  min-height: 100vh;
  background: radial-gradient(circle at top, #0b1d2d, #02060a 70%);
  color: white;
`;

/* HERO */
const Hero = styled.section`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  align-items: center;
  padding: 80px 60px;

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
  position: relative;
  height: 300px;
`;

const Planet = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #9bdcff, #1b3c5f);
  margin: auto;
  box-shadow: 0 0 90px rgba(100, 180, 255, 0.35);
`;

const Stars = styled.div`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(white 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.2;
  animation: ${starDrift} 45s linear infinite;
`;

/* PACKAGES */
const PackagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 26px;
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
  height: 150px;
  border-radius: 20px;
  cursor: pointer;
  background: rgba(180, 220, 240, 0.95);
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
