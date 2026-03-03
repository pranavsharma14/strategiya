import { Stack, TextField, Typography } from "@mui/material";
import type { FormData } from "./StepForm";

export default function ContactStep({
  data,
  update,
}: {
  data: FormData;
  update: (f: Partial<FormData>) => void;
}) {
  return (
    <Stack spacing={3}>
      <Typography variant="h5">Contact Details</Typography>

      <TextField
        label="Your Name"
        fullWidth
        value={data.name}
        onChange={(e) => update({ name: e.target.value })}
      />

      <TextField
        label="WhatsApp Number"
        fullWidth
        value={data.whatsapp}
        onChange={(e) => update({ whatsapp: e.target.value })}
      />
    </Stack>
  );
}
