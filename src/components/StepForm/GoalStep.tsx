import { Stack, TextField, Typography } from "@mui/material";
import type { FormData } from "./StepForm";

export default function GoalStep({
  data,
  update,
}: {
  data: FormData;
  update: (f: Partial<FormData>) => void;
}) {
  return (
    <Stack spacing={3}>
      <Typography variant="h5">Your Goal in 30 Days</Typography>

      <TextField
        label="What result do you want in 30 days?"
        multiline
        rows={4}
        fullWidth
        value={data.goal}
        onChange={(e) => update({ goal: e.target.value })}
      />
    </Stack>
  );
}
