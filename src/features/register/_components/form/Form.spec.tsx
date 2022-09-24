import { describe, it, expect, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import Form from "./Form";

const noop = () => {};

describe("Form", () => {
  it("should display well", () => {
    const { getByPlaceholderText, getByText } = render(
      <Form
        step={1}
        values={{ firstname: "", lastname: "", email: "", phone: "" }}
        onStep1Validation={noop}
        onStep2Validation={noop}
      />
    );
    expect(getByText(/sign up step 1 \/ 2/i)).toBeDefined();
    expect(getByPlaceholderText(/prénom/i)).toBeDefined();
    expect(getByPlaceholderText(/^nom$/i)).toBeDefined();
    expect(getByText(/suivant/i)).toBeDefined();
  });
  it("should display step 1 errors", () => {
    const { getByPlaceholderText, getAllByText } = render(
      <Form
        step={1}
        values={{ firstname: "", lastname: "", email: "", phone: "" }}
        onStep1Validation={noop}
        onStep2Validation={noop}
      />
    );
    fireEvent.change(getByPlaceholderText(/prénom/i), {
      target: { value: "123" },
    });
    fireEvent.change(getByPlaceholderText(/^nom$/i), {
      target: { value: "123" },
    });

    expect(getAllByText(/le champs n'est pas au bon format/i)).toHaveLength(2);
  });
  it("should remove displayed error", () => {
    const { getByPlaceholderText, queryAllByText } = render(
      <Form
        step={1}
        values={{ firstname: "", lastname: "", email: "", phone: "" }}
        onStep1Validation={noop}
        onStep2Validation={noop}
      />
    );
    fireEvent.change(getByPlaceholderText(/prénom/i), {
      target: { value: "john" },
    });
    fireEvent.change(getByPlaceholderText(/^nom$/i), {
      target: { value: "doe" },
    });

    expect(queryAllByText(/le champs n'est pas au bon format/i)).toHaveLength(
      0
    );
  });
  it("should validate step 1", () => {
    const mockOnStep1Validation = vi.fn();
    const { getByPlaceholderText, getByText } = render(
      <Form
        step={1}
        values={{ firstname: "", lastname: "", email: "", phone: "" }}
        onStep1Validation={mockOnStep1Validation}
        onStep2Validation={noop}
      />
    );
    fireEvent.change(getByPlaceholderText(/prénom/i), {
      target: { value: "john" },
    });
    fireEvent.change(getByPlaceholderText(/^nom$/i), {
      target: { value: "doe" },
    });
    fireEvent.click(getByText(/suivant/i));

    expect(mockOnStep1Validation).toHaveBeenCalledWith({
      firstname: "john",
      lastname: "doe",
    });
  });
  it("should display step 2 errors", () => {
    const { getByPlaceholderText, getByText } = render(
      <Form
        step={2}
        values={{ firstname: "", lastname: "", email: "", phone: "" }}
        onStep1Validation={noop}
        onStep2Validation={noop}
      />
    );

    fireEvent.change(getByPlaceholderText(/e-mail/i), {
      target: { value: "johndoe.com" },
    });
    fireEvent.change(getByPlaceholderText(/phone/i), {
      target: { value: "doe" },
    });

    expect(getByText(/le champs email n'est pas au bon format/i)).toBeDefined();
    expect(
      getByText(/le numéro de téléphone n'est pas au bon format/i)
    ).toBeDefined();
  });
  it("should remove step 2 displayed error", () => {
    const { getByPlaceholderText, queryByText } = render(
      <Form
        step={2}
        values={{ firstname: "", lastname: "", email: "", phone: "" }}
        onStep1Validation={noop}
        onStep2Validation={noop}
      />
    );

    fireEvent.change(getByPlaceholderText(/e-mail/i), {
      target: { value: "john@doe.com" },
    });
    fireEvent.change(getByPlaceholderText(/phone/i), {
      target: { value: "+33675453567" },
    });

    expect(queryByText(/le champs email n'est pas au bon format/i)).toBeNull();
    expect(
      queryByText(/le numéro de téléphone n'est pas au bon format/i)
    ).toBeNull();
  });

  it("should submit form", () => {
    const mockOnStep2Validation = vi.fn();
    const { getByPlaceholderText, getByText } = render(
      <Form
        step={2}
        values={{ firstname: "john", lastname: "doe", email: "", phone: "" }}
        onStep1Validation={noop}
        onStep2Validation={mockOnStep2Validation}
      />
    );

    fireEvent.change(getByPlaceholderText(/e-mail/i), {
      target: { value: "john@doe.com" },
    });
    fireEvent.change(getByPlaceholderText(/phone/i), {
      target: { value: "+33675453567" },
    });

    expect(getByText(/envoie/i)).toBeDefined();

    fireEvent.click(getByText(/envoie/i));

    expect(mockOnStep2Validation).toHaveBeenCalledWith({
      email: "john@doe.com",
      phone: "+33675453567",
    });
  });
});
