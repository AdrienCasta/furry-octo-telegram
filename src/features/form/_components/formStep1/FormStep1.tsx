interface FormStep1Props {
  firstname: string;
  lastname: string;
  onFirstnameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onLastnameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  firstnameError: {
    error: boolean;
    message: (string | null)[];
  };
  lastnameError: {
    error: boolean;
    message: (string | null)[];
  };
}

const FormStep1 = ({
  firstname,
  lastname,
  firstnameError,
  lastnameError,
  onFirstnameChange,
  onLastnameChange,
}: FormStep1Props) => {
  return (
    <fieldset>
      <div>
        <label htmlFor="firstname">
          <span>Prénom</span>
          <input
            value={firstname}
            onChange={onFirstnameChange}
            aria-invalid={firstnameError.error}
            type="text"
            placeholder="Prénom"
            name="firstname"
            id="firstname"
            aria-describedby="firstnameError"
          />
        </label>
        <ul>
          {firstnameError.message.map((errorMessage) => (
            <li key={`firstname:${errorMessage}`} id="firstnameError">
              {errorMessage}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <label htmlFor="lastname">
          <span>Nom</span>
          <input
            value={lastname}
            onChange={onLastnameChange}
            aria-invalid={lastnameError.error}
            type="text"
            aria-describedby="lastnameError"
            placeholder="bom"
            id="lastname"
          />
        </label>
        <ul>
          {lastnameError.message.map((errorMessage) => (
            <li key={`lastname:${errorMessage}`} id="lastnameError">
              {errorMessage}
            </li>
          ))}
        </ul>
      </div>
    </fieldset>
  );
};

export default FormStep1;
