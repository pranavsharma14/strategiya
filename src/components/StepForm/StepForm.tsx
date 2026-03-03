import { useState } from "react";
import { Box, Stepper, Step, StepLabel, Button } from "@mui/material";
import IdeaStep from "./IdeaStep";
import BudgetStep from "./BudgetStep";
import GoalStep from "./GoalStep";
import ContactStep from "./ContactStep";
import WhatsAppRedirect from "../WhatsAppRedirect";
import { submitIdea } from "../../utils/submitIdea";

export type FormData = {
  idea: string;
  audience: string;
  budget: string;
  timeCommitment: string;
  goal: string;
  name: string;
  whatsapp: string;
};

const steps = ["Idea", "Budget", "Goal", "Contact"];

export default function StepForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [data, setData] = useState<FormData>({
    idea: "",
    audience: "",
    budget: "",
    timeCommitment: "",
    goal: "",
    name: "",
    whatsapp: "",
  });

  const next = () => setActiveStep((s) => s + 1);
  const back = () => setActiveStep((s) => s - 1);

  const update = (fields: Partial<FormData>) =>
    setData((prev) => ({ ...prev, ...fields }));

  const handleSubmit = async () => {
    console.log("Submit clicked");
    // setSubmitted(true);
    console.log(data);
    const success = await submitIdea(data);

    if (success) {
      setSubmitted(true);
    } else {
      alert("Something went wrong. Please try again.");
    }
  };


  if (submitted) return <WhatsAppRedirect data={data} />;

  return (
    <Box>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && <IdeaStep data={data} update={update} />}
      {activeStep === 1 && <BudgetStep data={data} update={update} />}
      {activeStep === 2 && <GoalStep data={data} update={update} />}
      {activeStep === 3 && <ContactStep data={data} update={update} />}

      <Box mt={4} display="flex" justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={back}>
          Back
        </Button>

        {activeStep === steps.length - 1 ? (
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        ) : (
          <Button variant="contained" onClick={next}>
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
}
