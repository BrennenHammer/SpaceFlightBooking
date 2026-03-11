import { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(saved);
  }, []);

  const deleteBooking = (index) => {
    const updated = bookings.filter((_, i) => i !== index);
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  return (
    <Page>
      <Navbar />

      <Container>
        <Header>
          <h1>Mission Control</h1>
          <p>Scheduled space travel consultations</p>
        </Header>

        {bookings.length === 0 && (
          <Empty>No appointments scheduled yet.</Empty>
        )}

        <Grid>
          {bookings.map((booking, index) => (
            <Card key={index}>
              <Top>
                <h3>{booking.packageName}</h3>
                <Price>{booking.price}</Price>
              </Top>

              <Info>
                <Row>
                  <Label>Mission</Label>
                  <Value>{booking.mission}</Value>
                </Row>

                <Row>
                  <Label>Day</Label>
                  <Value>{booking.day}</Value>
                </Row>

                <Row>
                  <Label>Time</Label>
                  <Value>{booking.time}</Value>
                </Row>

                <Row>
                  <Label>Booked</Label>
                  <Value>
                    {new Date(booking.createdAt).toLocaleString()}
                  </Value>
                </Row>
              </Info>

              <DeleteButton onClick={() => deleteBooking(index)}>
                Remove
              </DeleteButton>
            </Card>
          ))}
        </Grid>
      </Container>
    </Page>
  );
};

export default AdminDashboard;

/* ================= STYLES ================= */

const Page = styled.div`
  min-height: 100vh;
  background: radial-gradient(circle at top, #0b1d2d, #02060a 70%);
  color: white;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 80px auto;
  padding: 0 24px;
`;

const Header = styled.div`
  margin-bottom: 40px;

  h1 {
    font-size: 42px;
  }

  p {
    opacity: 0.7;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  padding: 24px;
  border-radius: 18px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(14px);
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;

  h3 {
    font-size: 20px;
  }
`;

const Price = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

const Info = styled.div`
  margin-bottom: 16px;
`;

const Row = styled.div`
  margin-bottom: 8px;
`;

const Label = styled.div`
  font-size: 12px;
  opacity: 0.6;
`;

const Value = styled.div`
  font-size: 15px;
`;

const DeleteButton = styled.button`
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: none;
  background: #ff4d4d;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const Empty = styled.div`
  padding: 30px;
  border-radius: 14px;
  background: rgba(255,255,255,0.04);
`;
