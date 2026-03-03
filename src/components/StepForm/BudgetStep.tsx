import { Stack, TextField, Typography, MenuItem } from "@mui/material";
import type { FormData } from "./StepForm";

export default function BudgetStep({
  data,
  update,
}: {
  data: FormData;
  update: (f: Partial<FormData>) => void;
}) {
  return (
    <Stack spacing={3}>
      <Typography variant="h5">Resources</Typography>

      <TextField
        select
        label="Budget"
        fullWidth
        value={data.budget}
        onChange={(e) => update({ budget: e.target.value })}
      >
        <MenuItem value="0">No budget</MenuItem>
        <MenuItem value="1000">Below ₹1,000</MenuItem>
        <MenuItem value="5000">₹1,000 - ₹5,000</MenuItem>
        <MenuItem value="20000">₹5,000 - ₹20,000</MenuItem>
      </TextField>

      <TextField
        label="Daily Time Commitment"
        fullWidth
        value={data.timeCommitment}
        onChange={(e) => update({ timeCommitment: e.target.value })}
      />
    </Stack>
  );
}
