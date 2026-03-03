import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight={700}>
          
        </Typography>

        <Button
          component={Link}
          to="/submit"
          variant="contained"
          color="primary"
        >
          Submit Idea
        </Button>
      </Toolbar>
    </AppBar>
  );
}
