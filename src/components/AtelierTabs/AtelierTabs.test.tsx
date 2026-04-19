import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import {
  AtelierTabs,
  AtelierTabList,
  AtelierTab,
  AtelierTabPanel,
} from "./AtelierTabs";

function renderTabs(
  props: {
    defaultValue?: string;
    orientation?: "horizontal" | "vertical";
    disabledTabs?: string[];
  } = {},
) {
  const { defaultValue = "one", orientation, disabledTabs = [] } = props;

  return render(
    <AtelierTabs defaultValue={defaultValue} orientation={orientation}>
      <AtelierTabList>
        <AtelierTab value="one" disabled={disabledTabs.includes("one")}>
          Tab One
        </AtelierTab>
        <AtelierTab value="two" disabled={disabledTabs.includes("two")}>
          Tab Two
        </AtelierTab>
        <AtelierTab value="three" disabled={disabledTabs.includes("three")}>
          Tab Three
        </AtelierTab>
      </AtelierTabList>
      <AtelierTabPanel value="one">Content One</AtelierTabPanel>
      <AtelierTabPanel value="two">Content Two</AtelierTabPanel>
      <AtelierTabPanel value="three">Content Three</AtelierTabPanel>
    </AtelierTabs>,
  );
}

describe("AtelierTabs", () => {
  // --- ARIA roles ---

  it("renders with correct roles (tablist, tab, tabpanel)", () => {
    renderTabs();
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(3);
    expect(screen.getByRole("tabpanel")).toBeInTheDocument();
  });

  it("sets aria-selected on the active tab", () => {
    renderTabs({ defaultValue: "two" });
    const tabs = screen.getAllByRole("tab");
    expect(tabs[0]!).toHaveAttribute("aria-selected", "false");
    expect(tabs[1]!).toHaveAttribute("aria-selected", "true");
    expect(tabs[2]!).toHaveAttribute("aria-selected", "false");
  });

  it("links tab aria-controls to panel id", () => {
    renderTabs();
    const activeTab = screen.getByRole("tab", { selected: true });
    const controlsId = activeTab.getAttribute("aria-controls");
    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveAttribute("id", controlsId);
  });

  it("links panel aria-labelledby to tab id", () => {
    renderTabs();
    const activeTab = screen.getByRole("tab", { selected: true });
    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveAttribute("aria-labelledby", activeTab.id);
  });

  // --- Click interaction ---

  it("click activates a tab and shows its panel", async () => {
    const user = userEvent.setup();
    renderTabs();

    expect(screen.getByText("Content One")).toBeInTheDocument();
    expect(screen.queryByText("Content Two")).not.toBeInTheDocument();

    await user.click(screen.getByText("Tab Two"));

    expect(screen.queryByText("Content One")).not.toBeInTheDocument();
    expect(screen.getByText("Content Two")).toBeInTheDocument();
  });

  // --- Arrow key navigation ---

  it("ArrowRight moves focus to the next tab (wraps)", async () => {
    const user = userEvent.setup();
    renderTabs();

    const tabs = screen.getAllByRole("tab");
    tabs[0]!.focus();

    await user.keyboard("{ArrowRight}");
    expect(tabs[1]!).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    expect(tabs[2]!).toHaveFocus();

    // Wraps around
    await user.keyboard("{ArrowRight}");
    expect(tabs[0]!).toHaveFocus();
  });

  it("ArrowLeft moves focus to the previous tab (wraps)", async () => {
    const user = userEvent.setup();
    renderTabs();

    const tabs = screen.getAllByRole("tab");
    tabs[0]!.focus();

    await user.keyboard("{ArrowLeft}");
    expect(tabs[2]!).toHaveFocus();
  });

  // --- Home / End ---

  it("Home moves to the first tab, End moves to the last", async () => {
    const user = userEvent.setup();
    renderTabs();

    const tabs = screen.getAllByRole("tab");
    tabs[1]!.focus();

    await user.keyboard("{Home}");
    expect(tabs[0]!).toHaveFocus();

    await user.keyboard("{End}");
    expect(tabs[2]!).toHaveFocus();
  });

  // --- Tab key moves to panel ---

  it("Tab key moves focus to the active panel, not next tab", async () => {
    const user = userEvent.setup();
    renderTabs();

    const activeTab = screen.getByRole("tab", { selected: true });
    activeTab.focus();

    await user.keyboard("{Tab}");
    expect(screen.getByRole("tabpanel")).toHaveFocus();
  });

  // --- Controlled mode ---

  it("supports controlled mode via value + onValueChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <AtelierTabs value="one" defaultValue="one" onValueChange={onChange}>
        <AtelierTabList>
          <AtelierTab value="one">Tab One</AtelierTab>
          <AtelierTab value="two">Tab Two</AtelierTab>
        </AtelierTabList>
        <AtelierTabPanel value="one">Content One</AtelierTabPanel>
        <AtelierTabPanel value="two">Content Two</AtelierTabPanel>
      </AtelierTabs>,
    );

    await user.click(screen.getByText("Tab Two"));
    expect(onChange).toHaveBeenCalledWith("two");
  });

  // --- Disabled tab ---

  it("disabled tab is skipped during keyboard navigation", async () => {
    const user = userEvent.setup();
    renderTabs({ defaultValue: "one", disabledTabs: ["two"] });

    const tabs = screen.getAllByRole("tab");
    tabs[0]!.focus();

    await user.keyboard("{ArrowRight}");
    // Should skip "two" and go to "three"
    expect(tabs[2]!).toHaveFocus();
  });

  it("disabled tab cannot be activated by click", async () => {
    const user = userEvent.setup();
    renderTabs({ defaultValue: "one", disabledTabs: ["two"] });

    await user.click(screen.getByText("Tab Two"));
    // Panel should still show Content One
    expect(screen.getByText("Content One")).toBeInTheDocument();
    expect(screen.queryByText("Content Two")).not.toBeInTheDocument();
  });

  // --- Vertical orientation ---

  it("uses ArrowDown/ArrowUp in vertical orientation", async () => {
    const user = userEvent.setup();
    renderTabs({ orientation: "vertical" });

    const tabs = screen.getAllByRole("tab");
    tabs[0]!.focus();

    await user.keyboard("{ArrowDown}");
    expect(tabs[1]!).toHaveFocus();

    await user.keyboard("{ArrowUp}");
    expect(tabs[0]!).toHaveFocus();
  });

  // --- Accessibility ---

  it("has no axe violations", async () => {
    const { container } = renderTabs();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
