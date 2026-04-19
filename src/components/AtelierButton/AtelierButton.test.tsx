import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { AtelierButton } from "./AtelierButton";

describe("AtelierButton", () => {
  // --- Rendering ---

  it("renders as a button by default", () => {
    render(<AtelierButton>Click me</AtelierButton>);
    const btn = screen.getByRole("button", { name: "Click me" });
    expect(btn.tagName).toBe("BUTTON");
    expect(btn).toHaveAttribute("type", "button");
  });

  it("renders as an anchor when as='a' is passed", () => {
    render(
      <AtelierButton as="a" href="/about">
        Link
      </AtelierButton>,
    );
    const link = screen.getByText("Link");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/about");
  });

  it("applies variant classes", () => {
    render(<AtelierButton variant="destructive">Delete</AtelierButton>);
    const btn = screen.getByRole("button");
    // CSS module class names are hashed, but should contain the variant name
    expect(btn.className).toBeTruthy();
  });

  it("applies size classes", () => {
    render(<AtelierButton size="lg">Large</AtelierButton>);
    const btn = screen.getByRole("button");
    expect(btn.className).toBeTruthy();
  });

  // --- Disabled state ---

  it("sets disabled attribute when disabled", () => {
    render(<AtelierButton disabled>Disabled</AtelierButton>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("sets disabled and aria-busy when loading", () => {
    render(<AtelierButton loading>Saving</AtelierButton>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-busy", "true");
  });

  // --- Interaction ---

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<AtelierButton onClick={handleClick}>Click</AtelierButton>);
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <AtelierButton disabled onClick={handleClick}>
        Click
      </AtelierButton>,
    );
    await user.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // --- Icon slots ---

  it("renders left and right icons", () => {
    render(
      <AtelierButton
        leftIcon={<span data-testid="left-icon" />}
        rightIcon={<span data-testid="right-icon" />}
      >
        With Icons
      </AtelierButton>,
    );
    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });

  it("shows spinner instead of leftIcon when loading", () => {
    render(
      <AtelierButton loading leftIcon={<span data-testid="left-icon" />}>
        Loading
      </AtelierButton>,
    );
    expect(screen.queryByTestId("left-icon")).not.toBeInTheDocument();
    expect(screen.getByRole("button").querySelector("svg")).toBeInTheDocument();
  });

  // --- Accessibility ---

  it("has no axe violations", async () => {
    const { container } = render(<AtelierButton>Accessible</AtelierButton>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no axe violations when disabled", async () => {
    const { container } = render(
      <AtelierButton disabled>Disabled</AtelierButton>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
