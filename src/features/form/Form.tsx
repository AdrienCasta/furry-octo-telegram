import { useState } from "react";
import { FormStep1, FormStep2, FormHeader } from "./_components";
import { useForm } from "./_hooks";

function Form() {
  const { values, actions, errors, submitable, isStep1Valid } = useForm();
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
            firstname={values.firstname}
            lastname={values.lastname}
            firstnameError={errors.firstname}
            lastnameError={errors.lastname}
            onFirstnameChange={handleInputChange(actions.setFirstname)}
            onLastnameChange={handleInputChange(actions.setLastname)}
          />
          <button onClick={handleNextStep} disabled={!isStep1Valid}>
            Suivant
          </button>
        </section>
      )}

      {step === 1 && (
        <section>
          <FormStep2
            email={values.email}
            phone={values.phone}
            phoneError={errors.phone}
            emailError={errors.email}
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
