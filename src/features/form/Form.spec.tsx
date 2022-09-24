import { describe, it, expect, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { Form } from "..";

describe("Form", () => {
  it("should display step 1 field by default", () => {
    const { getByPlaceholderText, getByText } = render(<Form />);
    expect(getByText(/sign up step 1 \/ 2/i)).toBeDefined();
    expect(getByPlaceholderText(/prénom/i)).toBeDefined();
    expect(getByPlaceholderText(/^nom$/i)).toBeDefined();
    expect(getByText(/suivant/i)).toBeDefined();
  });
  it("should display step 1 errors", () => {
    const { getByPlaceholderText, getAllByText } = render(<Form />);
    fireEvent.change(getByPlaceholderText(/prénom/i), {
      target: { value: "123" },
    });
    fireEvent.change(getByPlaceholderText(/^nom$/i), {
      target: { value: "123" },
    });

    expect(getAllByText(/le champs n'est pas au bon format/i)).toHaveLength(2);
  });
  it("should remove displayed error", () => {
    const { getByPlaceholderText, queryAllByText } = render(<Form />);
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
    const { getByPlaceholderText, getByText } = render(<Form />);
    fireEvent.change(getByPlaceholderText(/prénom/i), {
      target: { value: "john" },
    });
    fireEvent.change(getByPlaceholderText(/^nom$/i), {
      target: { value: "doe" },
    });
    fireEvent.click(getByText(/suivant/i));

    expect(getByText(/sign up step 2 \/ 2/i)).toBeDefined();
  });
  it("should display step 2 errors", () => {
    const { getByPlaceholderText, getByText } = render(<Form />);
    fireEvent.change(getByPlaceholderText(/prénom/i), {
      target: { value: "john" },
    });
    fireEvent.change(getByPlaceholderText(/^nom$/i), {
      target: { value: "doe" },
    });
    fireEvent.click(getByText(/suivant/i));

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
    const { getByPlaceholderText, queryByText, getByText } = render(<Form />);
    fireEvent.change(getByPlaceholderText(/prénom/i), {
      target: { value: "john" },
    });
    fireEvent.change(getByPlaceholderText(/^nom$/i), {
      target: { value: "doe" },
    });
    fireEvent.click(getByText(/suivant/i));

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
    const { getByPlaceholderText, getByText } = render(<Form />);
    fireEvent.change(getByPlaceholderText(/prénom/i), {
      target: { value: "john" },
    });
    fireEvent.change(getByPlaceholderText(/^nom$/i), {
      target: { value: "doe" },
    });
    fireEvent.click(getByText(/suivant/i));

    fireEvent.change(getByPlaceholderText(/e-mail/i), {
      target: { value: "john@doe.com" },
    });
    fireEvent.change(getByPlaceholderText(/phone/i), {
      target: { value: "+33675453567" },
    });

    expect(getByText(/envoie/i)).toBeDefined();
    fireEvent.click(getByText(/envoie/i));

    expect(getByText(/form has been submitted/i)).toBeDefined();
  });
});
