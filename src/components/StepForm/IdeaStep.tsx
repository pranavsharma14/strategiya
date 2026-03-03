import { TextField, Stack, Typography } from "@mui/material";
import type { FormData } from "./StepForm";

export default function IdeaStep({
  data,
  update,
}: {
  data: FormData;
  update: (f: Partial<FormData>) => void;
}) {
  return (
    <Stack spacing={3}>
      <Typography variant="h5">Tell us about your idea</Typography>

      <TextField
        label="What do you want to build?"
        multiline
        rows={4}
        fullWidth
        value={data.idea}
        onChange={(e) => update({ idea: e.target.value })}
      />

      <TextField
        label="Target Audience"
        fullWidth
        value={data.audience}
        onChange={(e) => update({ audience: e.target.value })}
      />
    </Stack>
  );
}
