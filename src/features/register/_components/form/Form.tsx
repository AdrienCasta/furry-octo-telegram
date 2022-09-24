import { RegistrationStep, RegistrationValues } from "../../types";
import { FormStep1, FormStep2, FormHeader } from "../../_components";
import { useForm } from "../../_hooks";

interface FormProps {
  step: RegistrationStep;
  values: RegistrationValues;
  onStep1Validation: (
    values: Pick<RegistrationValues, "firstname" | "lastname">
  ) => void;
  onStep2Validation: (
    values: Pick<RegistrationValues, "email" | "phone">
  ) => void;
}
function Form({
  step,
  values,
  onStep1Validation,
  onStep2Validation,
}: FormProps) {
  const { actions, errors, submitable, isStep1Valid, fields } = useForm(values);

  const handleInputChange =
    (_action: typeof actions[keyof typeof actions]) =>
    ({ target }: React.ChangeEvent<HTMLInputElement>) =>
      _action(target.value);

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { phone, email } = fields;
    console.log(phone, email);
    onStep2Validation({
      phone: phone.value,
      email: email.value,
    });
  };

  const handleNextStep = () => {
    if (isStep1Valid) {
      const { firstname, lastname } = fields;
      onStep1Validation({
        firstname: firstname.value,
        lastname: lastname.value,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormHeader step={step} />
      {step === 1 && (
        <section>
          <FormStep1
            firstname={fields.firstname.value}
            lastname={fields.lastname.value}
            firstnameError={
              fields.firstname.dirty ? errors.firstname : undefined
            }
            lastnameError={fields.lastname.dirty ? errors.lastname : undefined}
            onFirstnameChange={handleInputChange(actions.setFirstname)}
            onLastnameChange={handleInputChange(actions.setLastname)}
          />
          <button
            onClick={handleNextStep}
            disabled={!isStep1Valid}
            type="button"
          >
            Suivant
          </button>
        </section>
      )}

      {step === 2 && (
        <section>
          <FormStep2
            email={fields.email.value}
            phone={fields.phone.value}
            phoneError={fields.phone.dirty ? errors.phone : undefined}
            emailError={fields.email.dirty ? errors.email : undefined}
            onEmailChange={handleInputChange(actions.setEmail)}
            onPhoneChange={handleInputChange(actions.setPhone)}
          />

          <button type="submit" disabled={!submitable}>
            Envoie
          </button>
        </section>
      )}
    </form>
  );
}

export default Form;
