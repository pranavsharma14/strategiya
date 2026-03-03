import { Container, Typography } from "@mui/material";
import StepForm from "../components/StepForm/StepForm";

export default function SubmitIdea() {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" mb={4}>
        Submit Your Idea
      </Typography>
      <StepForm />
    </Container>
  );
}
