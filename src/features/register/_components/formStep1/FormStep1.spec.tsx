import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { FormStep1 } from "..";
const props = {
  firstname: "",
  lastname: "",
  onFirstnameChange: vi.fn(),
  onLastnameChange: vi.fn(),
  firstnameError: {
    error: false,
    message: [null],
  },
  lastnameError: {
    error: false,
    message: [null],
  },
};
describe("FormStep1", () => {
  it("should handle fields correctly", () => {
    const { getByPlaceholderText } = render(<FormStep1 {...props} />);
    expect(getByPlaceholderText(/prénom/i)).toBeDefined();
    expect(getByPlaceholderText(/^nom$/i)).toBeDefined();
    fireEvent.change(getByPlaceholderText(/prénom/i), {
      target: { value: "john" },
    });
    fireEvent.change(getByPlaceholderText(/^nom$/i), {
      target: { value: "doe" },
    });
    expect(props.onFirstnameChange).toHaveBeenCalled();
    expect(props.onLastnameChange).toHaveBeenCalled();
  });
  it("should display field value", () => {
    const { getByDisplayValue } = render(
      <FormStep1 {...props} firstname="john" lastname="doe" />
    );

    expect(getByDisplayValue(/john/i)).toBeDefined();
    expect(getByDisplayValue(/doe/i)).toBeDefined();
  });
  it("should display error", () => {
    const { getByText } = render(
      <FormStep1
        {...props}
        firstnameError={{
          error: true,
          message: [
            "Le prénom est requis",
            "Le prénom n'est pas au bon format",
          ],
        }}
        lastnameError={{
          error: true,
          message: ["Le nom est requis", "Le nom n'est pas au bon format"],
        }}
      />
    );

    expect(getByText(/le prénom est requis/i)).toBeDefined();
    expect(getByText(/le prénom n'est pas au bon format/i)).toBeDefined();
    expect(getByText(/le nom est requis/i)).toBeDefined();
    expect(getByText(/le nom n'est pas au bon format/i)).toBeDefined();
  });
});
