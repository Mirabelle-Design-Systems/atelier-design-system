import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import {
  AtelierDialog,
  AtelierDialogTrigger,
  AtelierDialogContent,
  AtelierDialogHeader,
  AtelierDialogFooter,
  AtelierDialogTitle,
  AtelierDialogDescription,
  AtelierDialogClose,
} from "./AtelierDialog";

function renderDialog(props: { defaultOpen?: boolean } = {}) {
  return render(
    <AtelierDialog defaultOpen={props.defaultOpen}>
      <AtelierDialogTrigger>Open</AtelierDialogTrigger>
      <AtelierDialogContent>
        <AtelierDialogHeader>
          <AtelierDialogTitle>Test Title</AtelierDialogTitle>
          <AtelierDialogDescription>Test description</AtelierDialogDescription>
        </AtelierDialogHeader>
        <input data-testid="dialog-input" placeholder="Type here" />
        <AtelierDialogFooter>
          <AtelierDialogClose>Cancel</AtelierDialogClose>
          <button type="button">Confirm</button>
        </AtelierDialogFooter>
      </AtelierDialogContent>
    </AtelierDialog>,
  );
}

describe("AtelierDialog", () => {
  // --- Rendering ---

  it("does not render content when closed", () => {
    renderDialog();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders content when trigger is clicked", async () => {
    const user = userEvent.setup();
    renderDialog();

    await user.click(screen.getByText("Open"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders content when defaultOpen is true", () => {
    renderDialog({ defaultOpen: true });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  // --- ARIA ---

  it("has role='dialog' and aria-modal='true'", async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByText("Open"));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("links title via aria-labelledby", async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByText("Open"));

    const dialog = screen.getByRole("dialog");
    const labelId = dialog.getAttribute("aria-labelledby");
    expect(labelId).toBeTruthy();

    const title = document.getElementById(labelId!);
    expect(title).toHaveTextContent("Test Title");
  });

  it("links description via aria-describedby", async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByText("Open"));

    const dialog = screen.getByRole("dialog");
    const descId = dialog.getAttribute("aria-describedby");
    expect(descId).toBeTruthy();

    const desc = document.getElementById(descId!);
    expect(desc).toHaveTextContent("Test description");
  });

  // --- Closing ---

  it("closes on Escape key", async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByText("Open"));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes when close button is clicked", async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByText("Open"));

    await user.click(screen.getByText("Cancel"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes when the X button is clicked", async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByText("Open"));

    const closeBtn = screen.getByLabelText("Close");
    await user.click(closeBtn);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  // --- Focus management ---

  it("moves focus into the dialog on open", async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByText("Open"));

    await waitFor(() => {
      const dialog = screen.getByRole("dialog");
      expect(dialog.contains(document.activeElement)).toBe(true);
    });
  });

  it("returns focus to trigger on close", async () => {
    const user = userEvent.setup();
    renderDialog();

    const trigger = screen.getByText("Open");
    await user.click(trigger);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });

  // --- Controlled ---

  it("supports controlled mode via open + onOpenChange", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <AtelierDialog open={false} onOpenChange={onOpenChange}>
        <AtelierDialogTrigger>Open</AtelierDialogTrigger>
        <AtelierDialogContent>
          <AtelierDialogTitle>Controlled</AtelierDialogTitle>
          <AtelierDialogDescription>Controlled dialog</AtelierDialogDescription>
        </AtelierDialogContent>
      </AtelierDialog>,
    );

    await user.click(screen.getByText("Open"));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  // --- Accessibility ---

  it("has no axe violations when open", async () => {
    renderDialog({ defaultOpen: true });
    const results = await axe(document.body);
    expect(results).toHaveNoViolations();
  });
});
