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
  const [searchParams] = useSearchParams();
  const selectedName = searchParams.get("pkg");

  const [selectedPkg, setSelectedPkg] = useState(null);
  const refs = useRef({});

  // -------- Scheduling (Mon–Fri, 9–5, 30 min) --------
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const timeOptions = (() => {
    const options = [];
    // 9:00 -> 17:00 (5:00 PM)
    for (let mins = 9 * 60; mins <= 17 * 60; mins += 30) {
      const h24 = Math.floor(mins / 60);
      const m = mins % 60;

      const ampm = h24 >= 12 ? "PM" : "AM";
      const h12 = ((h24 + 11) % 12) + 1;
      const mm = m.toString().padStart(2, "0");

      options.push(`${h12}:${mm} ${ampm}`);
    }
    return options;
  })();

  const weekdayOptions = (() => {
    const days = [];
    const now = new Date();

    // next 21 days, keep only Mon–Fri
    for (let i = 0; i < 21; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);

      const day = d.getDay(); // 0 Sun ... 6 Sat
      if (day === 0 || day === 6) continue;

      const label = d.toLocaleDateString(undefined, {
        weekday: "long",
        month: "short",
        day: "numeric",
      });

      days.push(label);
      if (days.length >= 10) break; // show 10 business days
    }
    return days;
  })();

  // scroll + highlight when coming from Home via ?pkg=
  useEffect(() => {
    if (!selectedName) return;
    const el = refs.current[selectedName];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [selectedName]);

  // reset scheduler whenever modal opens
  useEffect(() => {
    if (!selectedPkg) return;
    setSelectedDay("");
    setSelectedTime("");
  }, [selectedPkg]);

  const confirmBooking = () => {
    if (!selectedPkg) return;

    if (!selectedDay || !selectedTime) {
      alert("Please choose a weekday and a time between 9 AM and 5 PM.");
      return;
    }

    const booking = {
      packageName: selectedPkg.name,
      mission: selectedPkg.mission,
      price: selectedPkg.price,
      day: selectedDay,
      time: selectedTime,
      createdAt: new Date().toISOString(),
    };

    // For now: store locally so you can verify it works.
    // Later: replace with a POST to your backend so admin can view it.
    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    existing.push(booking);
    localStorage.setItem("bookings", JSON.stringify(existing));

    alert(`Booked: ${selectedDay} at ${selectedTime}`);
    setSelectedPkg(null);
  };

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
                  <BuyButton onClick={() => setSelectedPkg(pkg)}>Buy</BuyButton>
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
              <strong>Schedule your consultation</strong>

              <ScheduleGrid>
                <Field>
                  <label>Weekday</label>
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                  >
                    <option value="">Select a day (Mon–Fri)</option>
                    {weekdayOptions.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field>
                  <label>Time</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  >
                    <option value="">Select a time (9:00 AM – 5:00 PM)</option>
                    {timeOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
              </ScheduleGrid>

              <small>
                Available Monday–Friday, 9 AM–5 PM, in 30-minute intervals.
              </small>
            </ScheduleBox>

            <ModalActions>
              <Primary onClick={confirmBooking}>Confirm</Primary>
              <Ghost onClick={() => setSelectedPkg(null)}>Close</Ghost>
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
  padding: 18px;
`;

const Modal = styled.div`
  background: white;
  color: #02060a;
  padding: 28px;
  border-radius: 22px;
  max-width: 520px;
  width: 100%;

  h2 {
    margin: 0 0 8px;
  }

  p {
    line-height: 1.6;
    opacity: 0.9;
  }
`;

const ModalPrice = styled.div`
  font-size: 22px;
  font-weight: 800;
  margin: 8px 0 12px;
`;

const ScheduleBox = styled.div`
  margin-top: 16px;
  padding: 14px;
  border-radius: 16px;
  background: rgba(2, 6, 10, 0.06);

  strong {
    display: block;
    font-size: 14px;
    font-weight: 900;
    margin-bottom: 4px;
  }

  small {
    display: block;
    margin-top: 10px;
    opacity: 0.75;
    line-height: 1.4;
  }
`;

const ScheduleGrid = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 12px;
    font-weight: 800;
    color: rgba(2, 6, 10, 0.7);
    letter-spacing: 0.02em;
  }

  select {
    border-radius: 12px;
    border: 1px solid rgba(2, 6, 10, 0.12);
    padding: 10px 12px;
    outline: none;
    font-weight: 700;
    background: white;
  }
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
  cursor: pointer;
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
  cursor: pointer;
`;
