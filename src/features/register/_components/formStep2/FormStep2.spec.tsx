import { describe, it, expect, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { FormStep2 } from "..";
const props = {
  email: "",
  phone: "",
  onEmailChange: vi.fn(),
  onPhoneChange: vi.fn(),
  emailError: {
    error: false,
    message: [null],
  },
  phoneError: {
    error: false,
    message: [null],
  },
};
describe("FormStep2", () => {
  it("should handle fields correctly", () => {
    const { getByPlaceholderText } = render(<FormStep2 {...props} />);
    expect(getByPlaceholderText(/e-mail/i)).toBeDefined();
    expect(getByPlaceholderText(/phone/i)).toBeDefined();
    fireEvent.change(getByPlaceholderText(/e-mail/i), {
      target: { value: "john@doe.com" },
    });
    fireEvent.change(getByPlaceholderText(/phone/i), {
      target: { value: "0647067854" },
    });
    expect(props.onEmailChange).toHaveBeenCalled();
    expect(props.onPhoneChange).toHaveBeenCalled();
  });
  it("should display field value", () => {
    const { getByDisplayValue } = render(
      <FormStep2 {...props} email="john@doe.com" phone="0647067854" />
    );

    expect(getByDisplayValue(/john@doe.com/i)).toBeDefined();
    expect(getByDisplayValue(/0647067854/i)).toBeDefined();
  });
  it("should display error", () => {
    const { getByText } = render(
      <FormStep2
        {...props}
        emailError={{
          error: true,
          message: ["L'e-mail est requis", "L'e-mail n'est pas au bon format"],
        }}
        phoneError={{
          error: true,
          message: [
            "Le numéro de téléphone est requis",
            "Le numéro de téléphone n'est pas au bon format",
          ],
        }}
      />
    );

    expect(getByText(/l'e-mail est requis/i)).toBeDefined();
    expect(getByText(/l'e-mail n'est pas au bon format/i)).toBeDefined();
    expect(getByText(/le numéro de téléphone est requis/i)).toBeDefined();
    expect(
      getByText(/le numéro de téléphone n'est pas au bon format/i)
    ).toBeDefined();
  });
});
