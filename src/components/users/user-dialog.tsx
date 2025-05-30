"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserForm } from "./user-form";
import type { UserWithAddress } from "@/lib/types";

interface UserDialogProps {
  user?: UserWithAddress;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

export function UserDialog({
  user,
  open,
  onOpenChange,
  onClose,
}: UserDialogProps) {
  const isEditing = !!user;

  function handleSuccess() {
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit User" : "Create User"}</DialogTitle>
        </DialogHeader>
        <UserForm user={user} onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}
