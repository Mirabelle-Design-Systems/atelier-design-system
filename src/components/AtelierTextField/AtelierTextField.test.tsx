import { describe, it, expect, vi } from "vitest";
import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { AtelierTextField } from "./AtelierTextField";

describe("AtelierTextField", () => {
  // --- Composition ---

  it("renders compound parts", () => {
    render(
      <AtelierTextField>
        <AtelierTextField.Label>Email</AtelierTextField.Label>
        <AtelierTextField.Description>Work address</AtelierTextField.Description>
        <AtelierTextField.Input type="email" />
      </AtelierTextField>,
    );

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByText("Work address")).toBeInTheDocument();
  });

  it("throws when compound parts are used outside the root", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<AtelierTextField.Input />)).toThrow(
      /must be used within <AtelierTextField>/,
    );
    consoleError.mockRestore();
  });

  // --- Label association ---

  it("associates Label with Input via htmlFor / id", () => {
    render(
      <AtelierTextField>
        <AtelierTextField.Label>Username</AtelierTextField.Label>
        <AtelierTextField.Input />
      </AtelierTextField>,
    );

    const input = screen.getByLabelText("Username");
    const label = screen.getByText("Username").closest("label");
    expect(label).toHaveAttribute("for", input.id);
  });

  it("clicking the Label focuses the Input", async () => {
    const user = userEvent.setup();
    render(
      <AtelierTextField>
        <AtelierTextField.Label>Email</AtelierTextField.Label>
        <AtelierTextField.Input />
      </AtelierTextField>,
    );

    await user.click(screen.getByText("Email"));
    expect(screen.getByLabelText("Email")).toHaveFocus();
  });

  // --- ARIA wiring ---

  it("includes Description id in aria-describedby when present", () => {
    render(
      <AtelierTextField>
        <AtelierTextField.Label>Email</AtelierTextField.Label>
        <AtelierTextField.Description>Work address</AtelierTextField.Description>
        <AtelierTextField.Input />
      </AtelierTextField>,
    );

    const input = screen.getByLabelText("Email");
    const description = screen.getByText("Work address");
    expect(input).toHaveAttribute("aria-describedby", description.id);
  });

  it("does not set aria-describedby when no Description or Error is rendered", () => {
    render(
      <AtelierTextField>
        <AtelierTextField.Label>Email</AtelierTextField.Label>
        <AtelierTextField.Input />
      </AtelierTextField>,
    );

    expect(screen.getByLabelText("Email")).not.toHaveAttribute("aria-describedby");
  });

  it("includes both Description and Error ids in aria-describedby when invalid", () => {
    render(
      <AtelierTextField invalid>
        <AtelierTextField.Label>Email</AtelierTextField.Label>
        <AtelierTextField.Description>Work address</AtelierTextField.Description>
        <AtelierTextField.Input />
        <AtelierTextField.Error>Invalid email</AtelierTextField.Error>
      </AtelierTextField>,
    );

    const input = screen.getByLabelText("Email");
    const description = screen.getByText("Work address");
    const error = screen.getByText("Invalid email");
    const describedBy = input.getAttribute("aria-describedby") ?? "";
    expect(describedBy.split(" ")).toEqual(
      expect.arrayContaining([description.id, error.id]),
    );
  });

  // --- Invalid state ---

  it("sets aria-invalid when invalid", () => {
    render(
      <AtelierTextField invalid>
        <AtelierTextField.Label>Email</AtelierTextField.Label>
        <AtelierTextField.Input />
      </AtelierTextField>,
    );

    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
  });

  it("does not render Error when not invalid", () => {
    render(
      <AtelierTextField>
        <AtelierTextField.Label>Email</AtelierTextField.Label>
        <AtelierTextField.Input />
        <AtelierTextField.Error>Invalid email</AtelierTextField.Error>
      </AtelierTextField>,
    );

    expect(screen.queryByText("Invalid email")).not.toBeInTheDocument();
  });

  it("Error has role=alert when rendered", () => {
    render(
      <AtelierTextField invalid>
        <AtelierTextField.Label>Email</AtelierTextField.Label>
        <AtelierTextField.Input />
        <AtelierTextField.Error>Invalid email</AtelierTextField.Error>
      </AtelierTextField>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Invalid email");
  });

  it("sets aria-errormessage when invalid", () => {
    render(
      <AtelierTextField invalid>
        <AtelierTextField.Label>Email</AtelierTextField.Label>
        <AtelierTextField.Input />
        <AtelierTextField.Error>Invalid</AtelierTextField.Error>
      </AtelierTextField>,
    );

    const input = screen.getByLabelText("Email");
    const error = screen.getByText("Invalid");
    expect(input).toHaveAttribute("aria-errormessage", error.id);
  });

  // --- Disabled / readonly / required ---

  it("disables the input when root disabled", () => {
    render(
      <AtelierTextField disabled>
        <AtelierTextField.Label>Email</AtelierTextField.Label>
        <AtelierTextField.Input />
      </AtelierTextField>,
    );
    expect(screen.getByLabelText("Email")).toBeDisabled();
  });

  it("does not allow typing when disabled", async () => {
    const user = userEvent.setup();
    render(
      <AtelierTextField disabled>
        <AtelierTextField.Label>Email</AtelierTextField.Label>
        <AtelierTextField.Input />
      </AtelierTextField>,
    );

    const input = screen.getByLabelText("Email");
    await user.type(input, "hello");
    expect(input).toHaveValue("");
  });

  it("does not allow typing when readonly", async () => {
    const user = userEvent.setup();
    render(
      <AtelierTextField>
        <AtelierTextField.Label>Email</AtelierTextField.Label>
        <AtelierTextField.Input readOnly defaultValue="locked" />
      </AtelierTextField>,
    );

    const input = screen.getByLabelText("Email");
    await user.type(input, "hello");
    expect(input).toHaveValue("locked");
  });

  it("sets required and aria-required on input when root required", () => {
    render(
      <AtelierTextField required>
        <AtelierTextField.Label>Email</AtelierTextField.Label>
        <AtelierTextField.Input />
      </AtelierTextField>,
    );

    const input = screen.getByLabelText(/Email/) as HTMLInputElement;
    expect(input.required).toBe(true);
    expect(input).toHaveAttribute("aria-required", "true");
  });

  it("renders required marker on Label", () => {
    render(
      <AtelierTextField required>
        <AtelierTextField.Label>Email</AtelierTextField.Label>
        <AtelierTextField.Input />
      </AtelierTextField>,
    );

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  // --- Native input behavior ---

  it("forwards native input attributes", async () => {
    const user = userEvent.setup();
    render(
      <AtelierTextField>
        <AtelierTextField.Label>Email</AtelierTextField.Label>
        <AtelierTextField.Input
          type="email"
          placeholder="name@example.com"
          name="email"
        />
      </AtelierTextField>,
    );

    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("placeholder", "name@example.com");
    expect(input).toHaveAttribute("name", "email");

    await user.type(input, "a@b.com");
    expect(input).toHaveValue("a@b.com");
  });

  it("supports controlled value", async () => {
    const user = userEvent.setup();

    function Controlled() {
      const [value, setValue] = useState("");
      return (
        <AtelierTextField>
          <AtelierTextField.Label>Email</AtelierTextField.Label>
          <AtelierTextField.Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </AtelierTextField>
      );
    }

    render(<Controlled />);
    const input = screen.getByLabelText("Email");
    await user.type(input, "abc");
    expect(input).toHaveValue("abc");
  });

  // --- Sizes ---

  it("renders all size variants without error", () => {
    const sizes = ["sm", "md", "lg"] as const;
    for (const size of sizes) {
      const { unmount } = render(
        <AtelierTextField size={size}>
          <AtelierTextField.Label>Field</AtelierTextField.Label>
          <AtelierTextField.Input />
        </AtelierTextField>,
      );
      expect(screen.getByLabelText("Field")).toBeInTheDocument();
      unmount();
    }
  });

  // --- Accessibility (axe) ---

  it("has no axe violations in default state", async () => {
    const { container } = render(
      <AtelierTextField>
        <AtelierTextField.Label>Email</AtelierTextField.Label>
        <AtelierTextField.Input type="email" />
      </AtelierTextField>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no axe violations with description", async () => {
    const { container } = render(
      <AtelierTextField>
        <AtelierTextField.Label>Email</AtelierTextField.Label>
        <AtelierTextField.Description>Work address</AtelierTextField.Description>
        <AtelierTextField.Input type="email" />
      </AtelierTextField>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no axe violations when invalid with error", async () => {
    const { container } = render(
      <AtelierTextField invalid>
        <AtelierTextField.Label>Email</AtelierTextField.Label>
        <AtelierTextField.Input type="email" />
        <AtelierTextField.Error>Enter a valid email address</AtelierTextField.Error>
      </AtelierTextField>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no axe violations when disabled", async () => {
    const { container } = render(
      <AtelierTextField disabled>
        <AtelierTextField.Label>Email</AtelierTextField.Label>
        <AtelierTextField.Input type="email" />
      </AtelierTextField>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no axe violations when readonly", async () => {
    const { container } = render(
      <AtelierTextField>
        <AtelierTextField.Label>Email</AtelierTextField.Label>
        <AtelierTextField.Input type="email" readOnly defaultValue="x@y.com" />
      </AtelierTextField>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
