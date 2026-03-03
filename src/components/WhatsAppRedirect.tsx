import { Button, Stack, Typography } from "@mui/material";
import type { FormData } from "./StepForm/StepForm";

export default function WhatsAppRedirect({ data }: { data: FormData }) {
  const phone = "918171405125"; // apna number dalna

  const message = encodeURIComponent(
    `Hi, I submitted my idea on Strategia.\n\nIdea: ${data.idea}\nGoal: ${data.goal}`
  );

  const link = `https://wa.me/${phone}?text=${message}`;

  return (
    <Stack spacing={3} alignItems="center" mt={8}>
      <Typography variant="h4">🎉 Request Received</Typography>
      <Typography color="text.secondary" textAlign="center">
        Click below and send a WhatsApp message to confirm your blueprint
        request.
      </Typography>

      <Button variant="contained" size="large" href={link}>
        Open WhatsApp
      </Button>
    </Stack>
  );
}
