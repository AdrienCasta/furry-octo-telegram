import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { FormHeader } from "..";

describe("FormHeader", () => {
  it("should render step 1", () => {
    const { getByText } = render(<FormHeader step={1} />);
    expect(getByText(/sign up step 1 \/ 2/i)).toBeDefined();
  });
  it("should render step 2", () => {
    const { getByText } = render(<FormHeader step={2} />);
    expect(getByText(/sign up step 2 \/ 2/i)).toBeDefined();
  });
  it("should render step 3", () => {
    const { getByText } = render(<FormHeader step={3} />);
    expect(getByText(/form has been submitted/i)).toBeDefined();
  });
});
