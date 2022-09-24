import { useNavigate, useParams } from "react-router";
import { RegisterContext } from "./_contexts";
import { Form } from "./_components";
import { RegistrationStep, RegistrationValues } from "./types";

function Register() {
  const { state, dispatch } = RegisterContext.useRegister();
  const navigate = useNavigate();
  const { step } = useParams();

  const handleStep1Validation = ({
    firstname,
    lastname,
  }: Pick<RegistrationValues, "firstname" | "lastname">) => {
    dispatch({
      type: "SET_REGISTER",
      payload: {
        firstname,
        lastname,
      },
    });
    navigate(`/register/2`);
  };
  const handleStep2Validation = ({
    email,
    phone,
  }: Pick<RegistrationValues, "email" | "phone">) => {
    dispatch({
      type: "SET_REGISTER",
      payload: { email, phone },
    });
    navigate(`/register/3`);
  };
  return (
    <Form
      values={state}
      step={+(step || 1) as RegistrationStep}
      onStep1Validation={handleStep1Validation}
      onStep2Validation={handleStep2Validation}
    />
  );
}
export default Register;
