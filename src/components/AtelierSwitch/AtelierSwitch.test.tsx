import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { AtelierSwitch } from "./AtelierSwitch";

describe("AtelierSwitch", () => {
  // --- ARIA ---

  it("renders with role='switch'", () => {
    render(<AtelierSwitch aria-label="Toggle" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("has aria-checked=false by default", () => {
    render(<AtelierSwitch aria-label="Toggle" />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("has aria-checked=true when defaultChecked", () => {
    render(<AtelierSwitch defaultChecked aria-label="Toggle" />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  // --- Interaction ---

  it("toggles on click", async () => {
    const user = userEvent.setup();
    render(<AtelierSwitch aria-label="Toggle" />);
    const sw = screen.getByRole("switch");

    expect(sw).toHaveAttribute("aria-checked", "false");
    await user.click(sw);
    expect(sw).toHaveAttribute("aria-checked", "true");
    await user.click(sw);
    expect(sw).toHaveAttribute("aria-checked", "false");
  });

  it("toggles on Space key", async () => {
    const user = userEvent.setup();
    render(<AtelierSwitch aria-label="Toggle" />);
    const sw = screen.getByRole("switch");

    sw.focus();
    await user.keyboard(" ");
    expect(sw).toHaveAttribute("aria-checked", "true");
  });

  it("toggles on Enter key", async () => {
    const user = userEvent.setup();
    render(<AtelierSwitch aria-label="Toggle" />);
    const sw = screen.getByRole("switch");

    sw.focus();
    await user.keyboard("{Enter}");
    expect(sw).toHaveAttribute("aria-checked", "true");
  });

  it("does not toggle when disabled", async () => {
    const user = userEvent.setup();
    render(<AtelierSwitch disabled aria-label="Toggle" />);
    const sw = screen.getByRole("switch");

    await user.click(sw);
    expect(sw).toHaveAttribute("aria-checked", "false");
  });

  // --- Controlled ---

  it("calls onCheckedChange in controlled mode", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <AtelierSwitch checked={false} onCheckedChange={onChange} aria-label="Toggle" />,
    );

    await user.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  // --- Label ---

  it("renders a visible label via children", () => {
    render(<AtelierSwitch>Dark mode</AtelierSwitch>);
    expect(screen.getByText("Dark mode")).toBeInTheDocument();
    // The label should be associated with the switch
    const sw = screen.getByRole("switch");
    expect(sw).toHaveAttribute("aria-labelledby");
  });

  // --- Form ---

  it("includes a hidden input with the value when checked", () => {
    const { container } = render(
      <AtelierSwitch name="notifications" defaultChecked aria-label="Notifications" />,
    );
    const hidden = container.querySelector('input[type="hidden"]');
    expect(hidden).toHaveAttribute("name", "notifications");
    expect(hidden).toHaveAttribute("value", "on");
  });

  // --- Accessibility ---

  it("has no axe violations", async () => {
    const { container } = render(<AtelierSwitch>Notifications</AtelierSwitch>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no axe violations when disabled", async () => {
    const { container } = render(
      <AtelierSwitch disabled>Disabled</AtelierSwitch>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
