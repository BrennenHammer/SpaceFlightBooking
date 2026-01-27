import styled from "styled-components";
import Navbar from "../components/Navbar";
const AboutPage = () => {
  return (
    <Page2>
      <Container>
        {/* HERO */}
        <Hero2>
          <h1>
            We build modern web experiences that feel fast, intentional, and
            reliable.
          </h1>
          <p>
            Space Travel Agency focuses on clean interfaces, thoughtful
            architecture, and performance-first development — without the
            fluff.
          </p>
        </Hero2>

        {/* SPLIT SECTION */}
        <Split>
          <div>
            <h2>What We Do</h2>
            <p>
              We design and build high-performance web applications — from
              focused landing pages to full-stack platforms using React and the
              MERN stack.
            </p>
            <p>
              Every project is built with scalability, maintainability, and user
              experience in mind.
            </p>
          </div>

          <div>
            <h2>Our Approach</h2>
            <p>
              We believe good software should feel invisible. That means clean
              UI, smooth interactions, and code that’s easy to extend long after
              launch.
            </p>
            <p>
              No shortcuts. No bloated frameworks. Just solid engineering.
            </p>
          </div>
        </Split>

        {/* SURFACE */}
        <Surface>
          <h2>Why Work With Us</h2>
          <List>
            <li>
              <span>⚡</span>
              <div>
                <strong>Performance first</strong>
                <p>Optimized builds that load fast and scale cleanly.</p>
              </div>
            </li>

            <li>
              <span>🎨</span>
              <div>
                <strong>Modern, intentional design</strong>
                <p>Simple layouts that feel polished — not trendy.</p>
              </div>
            </li>

            <li>
              <span>🧠</span>
              <div>
                <strong>Real problem solving</strong>
                <p>We focus on what actually helps your users and business.</p>
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
