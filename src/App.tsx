import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Box>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
