interface FormStep1Props {
  email: string;
  phone: string;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  emailError: {
    error: boolean;
    message: (string | null)[];
  };
  phoneError: {
    error: boolean;
    message: (string | null)[];
  };
}

const FormStep2 = ({
  email,
  phone,
  emailError,
  phoneError,
  onPhoneChange,
  onEmailChange,
}: FormStep1Props) => {
  return (
    <fieldset>
      <div>
        <label htmlFor="email">
          <span>E-mail</span>
          <input
            value={email}
            onChange={onEmailChange}
            aria-invalid={emailError.error}
            type="text"
            placeholder="E-mail"
            name="email"
            id="email"
            aria-describedby="emailError"
          />
        </label>
        {emailError.message.map((errorMessage) => (
          <p key={`email:${errorMessage}`} id="emailError">
            {errorMessage}
          </p>
        ))}
      </div>
      <div>
        <label htmlFor="phone">
          <span>Phone</span>
          <input
            value={phone}
            onChange={onPhoneChange}
            aria-invalid={phoneError.error}
            type="text"
            aria-describedby="phoneError"
            placeholder="bom"
            id="phone"
          />
        </label>
        {phoneError.message.map((errorMessage) => (
          <p key={`phone:${errorMessage}`} id="phoneError">
            {errorMessage}
          </p>
        ))}
      </div>
    </fieldset>
  );
};

export default FormStep2;
