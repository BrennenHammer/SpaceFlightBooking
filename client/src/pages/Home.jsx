import { useState } from "react";
import styled, { keyframes } from "styled-components";
import Navbar from "../components/Navbar";


const cosmicPulse = keyframes`
  0% { opacity: 0.25; transform: scale(0.96); }
  50% { opacity: 0.55; transform: scale(1.04); }
  100% { opacity: 0.25; transform: scale(0.96); }
`;

const nebulaShift = keyframes`
  0% { background-color: rgba(50, 120, 255, 0.3); }
  33% { background-color: rgba(180, 50, 255, 0.3); }
  66% { background-color: rgba(50, 255, 255, 0.3); }
  100% { background-color: rgba(50, 120, 255, 0.3); }
`;

const starShimmer = keyframes`
  0%, 100% { opacity: 0.3; transform: translate(0, 0) scale(1); }
  50% { opacity: 0.8; transform: translate(2px, -2px) scale(1.1); }
`;


const handleTilt = (e) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * 8;
  const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * -8;

  card.style.setProperty("--rx", `${rotateX}deg`);
  card.style.setProperty("--ry", `${rotateY}deg`);
  card.style.setProperty("--x", `${(x / rect.width) * 100}%`);
  card.style.setProperty("--y", `${(y / rect.height) * 100}%`);
};

const resetTilt = (e) => {
  const card = e.currentTarget;
  card.style.setProperty("--rx", "0deg");
  card.style.setProperty("--ry", "0deg");
};

/* =======================
   PACKAGE DATA
======================= */
const packagesData = [
  {
    name: "Intergalactic Package",
    price: "$400,000",
    description:
      "Luxury space flight with private cabin, zero-gravity lounge, and orbital views."
  },
  {
    name: "Explorer Package",
    price: "$250,000",
    description:
      "Extended orbital travel with research access and EVA training."
  },
  {
    name: "Mars Package",
    price: "$200,000",
    description:
      "Mars expedition preparation program with long-term mission simulation."
  },
  {
    name: "Lunar Package",
    price: "$100,000",
    description:
      "Moon fly-by experience with live Earthrise viewing."
  },
  {
    name: "Orbital Package",
    price: "$50,000",
    description:
      "Low-Earth orbit experience with guided space orientation."
  },
  {
    name: "Facilities Package",
    price: "$1,000",
    description:
      "Introductory training facilities access and astronaut orientation."
  }
];

/* =======================
   COMPONENT
======================= */
const Home = () => {
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleCloseModal = () => {
    setSelectedPackage(null);
    setFlippedIndex(null); // Reset flipped card
  };

  return (
    <Page>
      <Navbar />

      <Hero>
        <h1>Space traveling for the future of humanity is here!</h1>
        <h2>Book with the greatest!</h2>
      </Hero>

      <PackagesSection>
        <PackageHeader>Packages</PackageHeader>

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
      </PackagesSection>

      {selectedPackage && (
        <ModalOverlay onClick={handleCloseModal}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <h2>{selectedPackage.name}</h2>
            <Price>{selectedPackage.price}</Price>
            <p>{selectedPackage.description}</p>
            <CloseButton onClick={handleCloseModal}>Close</CloseButton>
          </Modal>
        </ModalOverlay>
      )}
    </Page>
  );
};

export default Home;

/* =======================
   STYLED COMPONENTS
======================= */
const Page = styled.div`
  min-height: 100vh;
  background: #000000;
`;

const Hero = styled.section`
  text-align: center;
  padding: 10px 10px 10px;

  h1 {
    font-size: 30px;
  }

  h2 {
    margin-top: 0px;
    font-weight: 400;
  }
`;

const PackagesSection = styled.section`
  padding: 10px 20px;
`;

const PackageHeader = styled.h2`
  text-align: center;
  margin-bottom: 40px;
`;

const PackagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(220px, 1fr));
  gap: 28px;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 680px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

const PackageCard = styled.div`
  height: 150px;
  border-radius: 18px;
  cursor: pointer;
  position: relative;
  transform-style: preserve-3d;
  will-change: transform;
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);

  background: lightblue;
  backdrop-filter: blur(16px);
  border: 1px solid rgba(0, 0, 0, 0.35);
  overflow: hidden;

  /* 🌌 OUTER COSMIC AURA */
  &::after {
    content: "";
    position: absolute;
    inset: -6px;
    border-radius: inherit;
    background: radial-gradient(
      circle,
      rgba(9, 12, 15, 0.45),
      rgba(4, 7, 19, 0.25),
      transparent 65%
    );
    filter: blur(10px);
    opacity: 0.35;
    z-index: -1;
    animation: ${cosmicPulse} 6s ease-in-out infinite;
  }

  /* ✨ CURSOR FOLLOWING INNER GLOW */
  &::before {
    content: "";
    position: absolute;
    inset: -50%;
    background: radial-gradient(
      circle at var(--x, 50%) var(--y, 50%),
      rgba(135, 149, 230, 0.45),
      rgba(255, 255, 255, 0.25),
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover::after {
    opacity: 0.6;
    filter: blur(22px);
  }

  @media (max-width: 768px) {
    transform: none !important;
    &::after {
      animation: none;
    }
  }
`;

const CardInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  transform: ${({ flipped }) =>
    flipped ? "rotateY(180deg)" : "rotateY(0deg)"};
`;

const CardFace = styled.div`
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CardFront = styled(CardFace)`
  transform: translateZ(40px);
`;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg) translateZ(40px);
  padding: 14px;
  font-size: 14px;
  text-align: center;
`;

const Title = styled.h3`
  font-size: 18px;
`;

const Price = styled.div`
  margin-top: 8px;
  font-weight: bold;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 18px;
  max-width: 420px;
  width: 90%;
`;

const CloseButton = styled.button`
  margin-top: 20px;
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  background: black;
  color: white;
  &:hover {
    opacity: 0.85;
  }
`;
