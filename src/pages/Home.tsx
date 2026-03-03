import { Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Stack spacing={3} alignItems="center" textAlign="center" mt={10}>
      <Typography variant="h3">
        Turn Your Idea Into a 30-Day Execution Plan
      </Typography>

      <Typography color="text.secondary" maxWidth={600}>
        Submit your startup or project idea and get a clear actionable blueprint
        to start building immediately.
      </Typography>

      <Button component={Link} to="/submit" variant="contained" size="large">
        Start Now
      </Button>
    </Stack>
  );
}
