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

export default function DialogPage() {
  return (
    <div className={showcase.page}>
      <h1 className={showcase.pageTitle}>Dialog</h1>
      <p className={showcase.pageDescription}>
        A modal dialog built on compound components. Manages focus trapping,
        scroll lock, inert background, and Escape-to-close out of the box.
      </p>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Basic Dialog</h2>
        <div className={showcase.preview}>
          <AtelierDialog>
            <AtelierDialogTrigger>
              <AtelierButton>Open Dialog</AtelierButton>
            </AtelierDialogTrigger>
            <AtelierDialogContent>
              <AtelierDialogHeader>
                <AtelierDialogTitle>Edit Profile</AtelierDialogTitle>
                <AtelierDialogDescription>
                  Make changes to your profile here. Click save when you are
                  done.
                </AtelierDialogDescription>
              </AtelierDialogHeader>
              <AtelierDialogFooter>
                <AtelierDialogClose>
                  <AtelierButton variant="outline">Cancel</AtelierButton>
                </AtelierDialogClose>
                <AtelierDialogClose>
                  <AtelierButton>Save changes</AtelierButton>
                </AtelierDialogClose>
              </AtelierDialogFooter>
            </AtelierDialogContent>
          </AtelierDialog>
        </div>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Destructive Confirmation</h2>
        <div className={showcase.preview}>
          <AtelierDialog>
            <AtelierDialogTrigger>
              <AtelierButton variant="destructive">
                Delete Account
              </AtelierButton>
            </AtelierDialogTrigger>
            <AtelierDialogContent>
              <AtelierDialogHeader>
                <AtelierDialogTitle>Are you sure?</AtelierDialogTitle>
                <AtelierDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove all associated data.
                </AtelierDialogDescription>
              </AtelierDialogHeader>
              <AtelierDialogFooter>
                <AtelierDialogClose>
                  <AtelierButton variant="outline">Cancel</AtelierButton>
                </AtelierDialogClose>
                <AtelierDialogClose>
                  <AtelierButton variant="destructive">
                    Yes, delete
                  </AtelierButton>
                </AtelierDialogClose>
              </AtelierDialogFooter>
            </AtelierDialogContent>
          </AtelierDialog>
        </div>
      </div>
    </div>
  );
}
