import { RegistrationStep } from "../../types";

interface FormHeaderProps {
  step: RegistrationStep;
}
const FormHeader = ({ step }: FormHeaderProps) => {
  if (step === 3) {
    return <h2>Form has been submitted</h2>;
  }
  if (step < 3) {
    return <h2>Sign up step {step} / 2</h2>;
  }

  return null;
};

export default FormHeader;
