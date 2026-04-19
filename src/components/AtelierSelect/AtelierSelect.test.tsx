import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import {
  AtelierSelect,
  AtelierSelectTrigger,
  AtelierSelectContent,
  AtelierSelectItem,
  AtelierSelectValue,
} from "./AtelierSelect";

function renderSelect(
  props: {
    defaultValue?: string;
    value?: string;
    onValueChange?: (v: string) => void;
    disabled?: boolean;
    placeholder?: string;
  } = {},
) {
  return render(
    <AtelierSelect
      defaultValue={props.defaultValue}
      value={props.value}
      onValueChange={props.onValueChange}
      disabled={props.disabled}
      placeholder={props.placeholder}
    >
      <AtelierSelectTrigger>
        <AtelierSelectValue placeholder={props.placeholder ?? "Pick one"} />
      </AtelierSelectTrigger>
      <AtelierSelectContent>
        <AtelierSelectItem value="alpha">Alpha</AtelierSelectItem>
        <AtelierSelectItem value="beta">Beta</AtelierSelectItem>
        <AtelierSelectItem value="gamma">Gamma</AtelierSelectItem>
        <AtelierSelectItem value="delta" disabled>
          Delta
        </AtelierSelectItem>
        <AtelierSelectItem value="epsilon">Epsilon</AtelierSelectItem>
      </AtelierSelectContent>
    </AtelierSelect>,
  );
}

describe("AtelierSelect", () => {
  // --- Rendering ---

  it("renders trigger with correct aria attributes", () => {
    renderSelect();
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
  });

  it("shows placeholder text when no value selected", () => {
    renderSelect({ placeholder: "Pick one" });
    expect(screen.getByText("Pick one")).toBeInTheDocument();
  });

  // --- Opening/Closing ---

  it("opens on click and shows listbox", async () => {
    const user = userEvent.setup();
    renderSelect();

    await user.click(screen.getByRole("combobox"));
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(5);
  });

  it("closes on Escape without selecting", async () => {
    const user = userEvent.setup();
    renderSelect();

    await user.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByText("Pick one")).toBeInTheDocument();
  });

  it("closes when clicking outside", async () => {
    const user = userEvent.setup();
    const { container } = renderSelect();

    await user.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await user.click(container.parentElement!);
    await waitFor(() => {
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  // --- Keyboard Navigation ---

  it("ArrowDown/ArrowUp navigates options with wrapping", async () => {
    const user = userEvent.setup();
    renderSelect();
    const trigger = screen.getByRole("combobox");

    await user.click(trigger);

    // First enabled option highlighted
    await user.keyboard("{ArrowDown}");
    expect(trigger.getAttribute("aria-activedescendant")).toMatch(
      /option-1/,
    );

    // ArrowDown again
    await user.keyboard("{ArrowDown}");
    expect(trigger.getAttribute("aria-activedescendant")).toMatch(
      /option-2/,
    );

    // Skip disabled delta (index 3), go to epsilon (index 4)
    await user.keyboard("{ArrowDown}");
    expect(trigger.getAttribute("aria-activedescendant")).toMatch(
      /option-4/,
    );

    // Wrap to first
    await user.keyboard("{ArrowDown}");
    expect(trigger.getAttribute("aria-activedescendant")).toMatch(
      /option-0/,
    );
  });

  it("Enter selects highlighted option and closes", async () => {
    const user = userEvent.setup();
    renderSelect();

    await user.click(screen.getByRole("combobox"));
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("Home jumps to first enabled option", async () => {
    const user = userEvent.setup();
    renderSelect();
    const trigger = screen.getByRole("combobox");

    await user.click(trigger);
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Home}");

    expect(trigger.getAttribute("aria-activedescendant")).toMatch(
      /option-0/,
    );
  });

  it("End jumps to last enabled option", async () => {
    const user = userEvent.setup();
    renderSelect();
    const trigger = screen.getByRole("combobox");

    await user.click(trigger);
    await user.keyboard("{End}");

    expect(trigger.getAttribute("aria-activedescendant")).toMatch(
      /option-4/,
    );
  });

  // --- Disabled ---

  it("disabled select does not open", async () => {
    const user = userEvent.setup();
    renderSelect({ disabled: true });

    await user.click(screen.getByRole("combobox"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("disabled option is skipped during keyboard nav", async () => {
    const user = userEvent.setup();
    renderSelect();
    const trigger = screen.getByRole("combobox");

    await user.click(trigger);
    // Navigate: alpha(0) -> beta(1) -> gamma(2) -> skip delta(3) -> epsilon(4)
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowDown}");

    expect(trigger.getAttribute("aria-activedescendant")).toMatch(
      /option-4/,
    );
  });

  // --- Controlled ---

  it("controlled mode works with value and onValueChange", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <AtelierSelect value="beta" onValueChange={onValueChange}>
        <AtelierSelectTrigger>
          <AtelierSelectValue placeholder="Pick" />
        </AtelierSelectTrigger>
        <AtelierSelectContent>
          <AtelierSelectItem value="alpha">Alpha</AtelierSelectItem>
          <AtelierSelectItem value="beta">Beta</AtelierSelectItem>
          <AtelierSelectItem value="gamma">Gamma</AtelierSelectItem>
        </AtelierSelectContent>
      </AtelierSelect>,
    );

    expect(screen.getByText("Beta")).toBeInTheDocument();

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("Gamma"));

    expect(onValueChange).toHaveBeenCalledWith("gamma");
  });

  // --- ARIA ---

  it("aria-selected is set on the selected option", async () => {
    const user = userEvent.setup();
    renderSelect({ defaultValue: "beta" });

    await user.click(screen.getByRole("combobox"));

    const options = screen.getAllByRole("option");
    const betaOption = options.find((o) => o.textContent?.includes("Beta"));
    expect(betaOption).toHaveAttribute("aria-selected", "true");

    const alphaOption = options.find((o) => o.textContent?.includes("Alpha"));
    expect(alphaOption).toHaveAttribute("aria-selected", "false");
  });

  it("aria-activedescendant updates as user navigates", async () => {
    const user = userEvent.setup();
    renderSelect();
    const trigger = screen.getByRole("combobox");

    await user.click(trigger);

    // Initially highlighted (first option, index 0)
    expect(trigger.getAttribute("aria-activedescendant")).toMatch(
      /option-0/,
    );

    await user.keyboard("{ArrowDown}");
    expect(trigger.getAttribute("aria-activedescendant")).toMatch(
      /option-1/,
    );

    await user.keyboard("{ArrowDown}");
    expect(trigger.getAttribute("aria-activedescendant")).toMatch(
      /option-2/,
    );
  });

  // --- Accessibility ---

  it("has no axe violations when open", async () => {
    const user = userEvent.setup();
    render(
      <main>
        <label htmlFor="test-select">Fruit</label>
        <AtelierSelect>
          <AtelierSelectTrigger aria-label="Fruit" className="test-trigger">
            <AtelierSelectValue placeholder="Pick one" />
          </AtelierSelectTrigger>
          <AtelierSelectContent>
            <AtelierSelectItem value="alpha">Alpha</AtelierSelectItem>
            <AtelierSelectItem value="beta">Beta</AtelierSelectItem>
          </AtelierSelectContent>
        </AtelierSelect>
      </main>,
    );

    await user.click(screen.getByRole("combobox"));

    const results = await axe(document.body, {
      rules: {
        // Region rule not applicable to isolated component tests;
        // the select is consumed inside a page with landmarks.
        region: { enabled: false },
      },
    });
    expect(results).toHaveNoViolations();
  });
});
