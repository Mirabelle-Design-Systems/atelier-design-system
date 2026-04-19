import { describe, it, expect, vi } from "vitest";
import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { AtelierCheckbox, type AtelierCheckboxState } from "./AtelierCheckbox";

describe("AtelierCheckbox", () => {
  // --- ARIA ---

  it("renders with role=checkbox", () => {
    render(<AtelierCheckbox aria-label="Accept" />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("aria-checked=false by default", () => {
    render(<AtelierCheckbox aria-label="Accept" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "false");
  });

  it("aria-checked=true when defaultChecked", () => {
    render(<AtelierCheckbox defaultChecked aria-label="Accept" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "true");
  });

  it("aria-checked=mixed when indeterminate", () => {
    render(<AtelierCheckbox checked="indeterminate" aria-label="Accept" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "mixed");
  });

  // --- Interaction ---

  it("toggles on click", async () => {
    const user = userEvent.setup();
    render(<AtelierCheckbox aria-label="Accept" />);
    const cb = screen.getByRole("checkbox");

    expect(cb).toHaveAttribute("aria-checked", "false");
    await user.click(cb);
    expect(cb).toHaveAttribute("aria-checked", "true");
    await user.click(cb);
    expect(cb).toHaveAttribute("aria-checked", "false");
  });

  it("toggles on Space key", async () => {
    const user = userEvent.setup();
    render(<AtelierCheckbox aria-label="Accept" />);
    const cb = screen.getByRole("checkbox");

    cb.focus();
    await user.keyboard(" ");
    expect(cb).toHaveAttribute("aria-checked", "true");
  });

  it("does NOT toggle on Enter (APG: Space only for checkbox)", async () => {
    const user = userEvent.setup();
    render(<AtelierCheckbox aria-label="Accept" />);
    const cb = screen.getByRole("checkbox");

    cb.focus();
    await user.keyboard("{Enter}");
    expect(cb).toHaveAttribute("aria-checked", "false");
  });

  it("clicking indeterminate transitions to checked (APG)", async () => {
    const user = userEvent.setup();

    function Tri() {
      const [state, setState] = useState<AtelierCheckboxState>("indeterminate");
      return (
        <AtelierCheckbox
          checked={state}
          onCheckedChange={setState}
          aria-label="Accept"
        />
      );
    }

    render(<Tri />);
    const cb = screen.getByRole("checkbox");
    expect(cb).toHaveAttribute("aria-checked", "mixed");
    await user.click(cb);
    expect(cb).toHaveAttribute("aria-checked", "true");
  });

  it("does not toggle when disabled", async () => {
    const user = userEvent.setup();
    render(<AtelierCheckbox disabled aria-label="Accept" />);
    const cb = screen.getByRole("checkbox");

    await user.click(cb);
    expect(cb).toHaveAttribute("aria-checked", "false");
  });

  // --- Controlled ---

  it("calls onCheckedChange in controlled mode", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <AtelierCheckbox
        checked={false}
        onCheckedChange={onChange}
        aria-label="Accept"
      />,
    );

    await user.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("indeterminate emits true on first click (APG)", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <AtelierCheckbox
        checked="indeterminate"
        onCheckedChange={onChange}
        aria-label="Accept"
      />,
    );

    await user.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  // --- Label ---

  it("renders a visible label via children and associates it", () => {
    render(<AtelierCheckbox>Accept terms</AtelierCheckbox>);
    expect(screen.getByText("Accept terms")).toBeInTheDocument();
    const cb = screen.getByRole("checkbox");
    expect(cb).toHaveAttribute("aria-labelledby");
  });

  // --- Form ---

  it("includes a hidden checkbox input that participates in form submission", () => {
    const { container } = render(
      <AtelierCheckbox name="terms" defaultChecked aria-label="Terms" />,
    );
    const hidden = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(hidden).toHaveAttribute("name", "terms");
    expect(hidden.checked).toBe(true);
    expect(hidden).toHaveAttribute("value", "on");
  });

  it("hidden input value matches `value` prop", () => {
    const { container } = render(
      <AtelierCheckbox name="terms" value="accepted" defaultChecked aria-label="Terms" />,
    );
    const hidden = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(hidden).toHaveAttribute("value", "accepted");
  });

  it("aria-required reflects required prop", () => {
    render(<AtelierCheckbox required aria-label="Required field" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-required", "true");
  });

  // --- Accessibility ---

  it("has no axe violations (default)", async () => {
    const { container } = render(<AtelierCheckbox>Accept</AtelierCheckbox>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no axe violations (checked)", async () => {
    const { container } = render(<AtelierCheckbox defaultChecked>Accept</AtelierCheckbox>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no axe violations (indeterminate)", async () => {
    const { container } = render(
      <AtelierCheckbox checked="indeterminate" onCheckedChange={() => {}}>
        Mixed
      </AtelierCheckbox>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no axe violations (disabled)", async () => {
    const { container } = render(<AtelierCheckbox disabled>Disabled</AtelierCheckbox>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
