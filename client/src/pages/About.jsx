import styled from "styled-components";
import Navbar from "../components/Navbar";
const AboutPage = () => {
  return (
    <Page2>
        <Navbar />
  <Container>
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

  );
};

export default AboutPage;

/* ================= STYLES ================= */

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
