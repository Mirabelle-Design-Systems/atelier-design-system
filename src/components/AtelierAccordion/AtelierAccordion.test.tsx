import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import {
  AtelierAccordion,
  AtelierAccordionItem,
  AtelierAccordionTrigger,
  AtelierAccordionContent,
} from "./AtelierAccordion";

function renderAccordion(props: { type?: "single" | "multiple"; defaultValue?: string | string[] } = {}) {
  const { type = "single", defaultValue } = props;

  const accordionProps =
    type === "multiple"
      ? { type: "multiple" as const, defaultValue: defaultValue as string[] | undefined }
      : { type: "single" as const, defaultValue: defaultValue as string | undefined };

  return render(
    <AtelierAccordion {...accordionProps}>
      <AtelierAccordionItem value="one">
        <AtelierAccordionTrigger>Item One</AtelierAccordionTrigger>
        <AtelierAccordionContent>Content One</AtelierAccordionContent>
      </AtelierAccordionItem>
      <AtelierAccordionItem value="two">
        <AtelierAccordionTrigger>Item Two</AtelierAccordionTrigger>
        <AtelierAccordionContent>Content Two</AtelierAccordionContent>
      </AtelierAccordionItem>
      <AtelierAccordionItem value="three">
        <AtelierAccordionTrigger>Item Three</AtelierAccordionTrigger>
        <AtelierAccordionContent>Content Three</AtelierAccordionContent>
      </AtelierAccordionItem>
    </AtelierAccordion>,
  );
}

describe("AtelierAccordion", () => {
  // --- ARIA ---

  it("renders triggers as buttons with aria-expanded", () => {
    renderAccordion();
    const triggers = screen.getAllByRole("button");
    expect(triggers).toHaveLength(3);
    triggers.forEach((trigger) => {
      expect(trigger).toHaveAttribute("aria-expanded");
      expect(trigger).toHaveAttribute("aria-controls");
    });
  });

  it("renders content panels with role='region' and aria-labelledby", () => {
    renderAccordion({ defaultValue: "one" });
    const region = screen.getByRole("region");
    expect(region).toHaveAttribute("aria-labelledby");
  });

  it("links trigger aria-controls to panel id", () => {
    renderAccordion({ defaultValue: "one" });
    const trigger = screen.getByText("Item One");
    const controlsId = trigger.getAttribute("aria-controls");
    const region = screen.getByRole("region");
    expect(region).toHaveAttribute("id", controlsId);
  });

  // --- Single mode ---

  it("opens an item on click in single mode", async () => {
    const user = userEvent.setup();
    renderAccordion();

    const trigger = screen.getByText("Item One");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("closes the open item when another is clicked in single mode", async () => {
    const user = userEvent.setup();
    renderAccordion({ defaultValue: "one" });

    const triggerOne = screen.getByText("Item One");
    const triggerTwo = screen.getByText("Item Two");

    expect(triggerOne).toHaveAttribute("aria-expanded", "true");
    await user.click(triggerTwo);
    expect(triggerOne).toHaveAttribute("aria-expanded", "false");
    expect(triggerTwo).toHaveAttribute("aria-expanded", "true");
  });

  // --- Multiple mode ---

  it("allows multiple items open in multiple mode", async () => {
    const user = userEvent.setup();
    renderAccordion({ type: "multiple" });

    const triggerOne = screen.getByText("Item One");
    const triggerTwo = screen.getByText("Item Two");

    await user.click(triggerOne);
    await user.click(triggerTwo);

    expect(triggerOne).toHaveAttribute("aria-expanded", "true");
    expect(triggerTwo).toHaveAttribute("aria-expanded", "true");
  });

  // --- Keyboard navigation ---

  it("toggles on Enter key", async () => {
    const user = userEvent.setup();
    renderAccordion();

    const trigger = screen.getByText("Item One");
    trigger.focus();
    await user.keyboard("{Enter}");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("toggles on Space key", async () => {
    const user = userEvent.setup();
    renderAccordion();

    const trigger = screen.getByText("Item One");
    trigger.focus();
    await user.keyboard(" ");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("moves focus with ArrowDown/ArrowUp", async () => {
    const user = userEvent.setup();
    renderAccordion();

    const triggerOne = screen.getByText("Item One");
    const triggerTwo = screen.getByText("Item Two");
    const triggerThree = screen.getByText("Item Three");

    triggerOne.focus();

    await user.keyboard("{ArrowDown}");
    expect(triggerTwo).toHaveFocus();

    await user.keyboard("{ArrowDown}");
    expect(triggerThree).toHaveFocus();

    // Wraps around
    await user.keyboard("{ArrowDown}");
    expect(triggerOne).toHaveFocus();
  });

  it("moves focus with ArrowUp (wraps)", async () => {
    const user = userEvent.setup();
    renderAccordion();

    const triggerOne = screen.getByText("Item One");
    const triggerThree = screen.getByText("Item Three");

    triggerOne.focus();

    await user.keyboard("{ArrowUp}");
    expect(triggerThree).toHaveFocus();
  });

  it("Home moves to first trigger, End moves to last", async () => {
    const user = userEvent.setup();
    renderAccordion();

    const triggerOne = screen.getByText("Item One");
    const triggerTwo = screen.getByText("Item Two");
    const triggerThree = screen.getByText("Item Three");

    triggerTwo.focus();

    await user.keyboard("{Home}");
    expect(triggerOne).toHaveFocus();

    await user.keyboard("{End}");
    expect(triggerThree).toHaveFocus();
  });

  // --- Controlled ---

  it("supports controlled single mode", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <AtelierAccordion type="single" value="one" onValueChange={onChange}>
        <AtelierAccordionItem value="one">
          <AtelierAccordionTrigger>Item One</AtelierAccordionTrigger>
          <AtelierAccordionContent>Content One</AtelierAccordionContent>
        </AtelierAccordionItem>
        <AtelierAccordionItem value="two">
          <AtelierAccordionTrigger>Item Two</AtelierAccordionTrigger>
          <AtelierAccordionContent>Content Two</AtelierAccordionContent>
        </AtelierAccordionItem>
      </AtelierAccordion>,
    );

    await user.click(screen.getByText("Item Two"));
    expect(onChange).toHaveBeenCalledWith("two");
  });

  // --- Accessibility ---

  it("has no axe violations", async () => {
    const { container } = renderAccordion({ defaultValue: "one" });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
