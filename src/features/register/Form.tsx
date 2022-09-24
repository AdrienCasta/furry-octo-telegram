import { useState } from "react";
import { FormStep1, FormStep2, FormHeader } from "./_components";
import { useForm } from "./_hooks";

function Form() {
  const { actions, errors, submitable, isStep1Valid, fields } = useForm();
  const [step, setStep] = useState<0 | 1 | 2>(0);

  const handleInputChange =
    (_action: typeof actions[keyof typeof actions]) =>
    ({ target }: React.ChangeEvent<HTMLInputElement>) =>
      _action(target.value);

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStep(2);
  };

  const handleNextStep = () => {
    if (isStep1Valid) {
      setStep(1);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormHeader step={step} />
      {step === 0 && (
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

      {step === 1 && (
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
