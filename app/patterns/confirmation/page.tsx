"use client";

import {
  AtelierButton,
  AtelierDialog,
  AtelierDialogTrigger,
  AtelierDialogContent,
  AtelierDialogHeader,
  AtelierDialogFooter,
  AtelierDialogTitle,
  AtelierDialogDescription,
  AtelierDialogClose,
} from "@atelier/primitives";
import showcase from "../../../app-components/showcase.module.css";

export default function ConfirmationPatternPage() {
  return (
    <div className={showcase.page}>
      <h1 className={showcase.pageTitle}>Confirmation Pattern</h1>
      <p className={showcase.pageDescription}>
        Confirmation dialogs protect against accidental destructive actions.
        The pattern pairs AtelierDialog with clear, concise copy and
        appropriately styled action buttons.
      </p>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Delete Confirmation</h2>
        <p className={showcase.sectionDescription}>
          Use a destructive button for the confirming action and an outline
          button for the escape hatch. The dialog title should name the
          action, and the description should explain the consequence.
        </p>
        <div className={showcase.preview}>
          <AtelierDialog>
            <AtelierDialogTrigger>
              <AtelierButton variant="destructive">Delete Item</AtelierButton>
            </AtelierDialogTrigger>
            <AtelierDialogContent>
              <AtelierDialogHeader>
                <AtelierDialogTitle>Delete this item?</AtelierDialogTitle>
                <AtelierDialogDescription>
                  This will permanently remove the item and all of its data.
                  This action cannot be undone.
                </AtelierDialogDescription>
              </AtelierDialogHeader>
              <AtelierDialogFooter>
                <AtelierDialogClose>
                  <AtelierButton variant="outline">Cancel</AtelierButton>
                </AtelierDialogClose>
                <AtelierDialogClose>
                  <AtelierButton variant="destructive">Delete</AtelierButton>
                </AtelierDialogClose>
              </AtelierDialogFooter>
            </AtelierDialogContent>
          </AtelierDialog>
        </div>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Unsaved Changes</h2>
        <p className={showcase.sectionDescription}>
          When navigating away from a form with unsaved edits, warn the user
          and offer a save option alongside discard and cancel.
        </p>
        <div className={showcase.preview}>
          <AtelierDialog>
            <AtelierDialogTrigger>
              <AtelierButton variant="outline">Leave Page</AtelierButton>
            </AtelierDialogTrigger>
            <AtelierDialogContent>
              <AtelierDialogHeader>
                <AtelierDialogTitle>Unsaved changes</AtelierDialogTitle>
                <AtelierDialogDescription>
                  You have unsaved changes that will be lost if you leave this
                  page.
                </AtelierDialogDescription>
              </AtelierDialogHeader>
              <AtelierDialogFooter>
                <AtelierDialogClose>
                  <AtelierButton variant="ghost">Discard</AtelierButton>
                </AtelierDialogClose>
                <AtelierDialogClose>
                  <AtelierButton>Save and leave</AtelierButton>
                </AtelierDialogClose>
              </AtelierDialogFooter>
            </AtelierDialogContent>
          </AtelierDialog>
        </div>
      </div>
    </div>
  );
}
