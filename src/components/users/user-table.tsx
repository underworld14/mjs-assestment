"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditIcon, Trash2Icon, PlusIcon } from "lucide-react";
import { formatDate, formatAddress } from "@/lib/utils";
import { DeleteUserDialog } from "./delete-user-dialog";
import { UserDialog } from "./user-dialog";
import type { UserWithAddress } from "@/lib/types";

interface UserTableProps {
  users: UserWithAddress[];
}

export function UserTable({ users }: UserTableProps) {
  const [selectedUser, setSelectedUser] = useState<UserWithAddress | null>(
    null
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserWithAddress | undefined>(
    undefined
  );

  function handleEdit(user: UserWithAddress) {
    setEditingUser(user);
    setUserDialogOpen(true);
  }

  function handleDelete(user: UserWithAddress) {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  }

  function handleCreate() {
    setEditingUser(undefined);
    setUserDialogOpen(true);
  }

  function handleDialogClose() {
    setUserDialogOpen(false);
    setEditingUser(undefined);
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Users Management
          </h1>
          <p className="text-muted-foreground">
            Manage user information and addresses
          </p>
        </div>
        <Button onClick={handleCreate} className="w-full sm:w-auto">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Birth Date</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <div className="text-muted-foreground">
                    <p>No users found</p>
                    <p className="text-sm">
                      Get started by adding your first user
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.firstname} {user.lastname}
                  </TableCell>
                  <TableCell>{formatDate(user.birthdate)}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {formatAddress(user.address)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(user)}
                      >
                        <EditIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(user)}
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {users.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <p>No users found</p>
              <p className="text-sm">Get started by adding your first user</p>
            </div>
          </div>
        ) : (
          users.map((user) => (
            <div key={user.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">
                    {user.firstname} {user.lastname}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Born: {formatDate(user.birthdate)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(user)}
                  >
                    <EditIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(user)}
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Address:
                </p>
                <p className="text-sm">{formatAddress(user.address)}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Dialogs */}
      <UserDialog
        user={editingUser}
        open={userDialogOpen}
        onOpenChange={setUserDialogOpen}
        onClose={handleDialogClose}
      />

      {selectedUser && (
        <DeleteUserDialog
          user={selectedUser}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        />
      )}
    </div>
  );
}
