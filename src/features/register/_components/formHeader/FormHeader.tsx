interface FormHeaderProps {
  step: 0 | 1 | 2;
}
const FormHeader = ({ step }: FormHeaderProps) => {
  if (step === 2) {
    return <h2>Form has been submitted</h2>;
  }
  if (step < 2) {
    return <h2>Sign up step {step + 1} / 2</h2>;
  }

  return null;
};

export default FormHeader;
