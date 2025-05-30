"use server";

import { db, schema } from "@/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { CreateUserData, UpdateUserData } from "@/lib/types";

export async function getUsers() {
  try {
    const users = await db
      .select({
        id: schema.users.id,
        firstname: schema.users.firstname,
        lastname: schema.users.lastname,
        birthdate: schema.users.birthdate,
        address: {
          id: schema.addresses.id,
          userId: schema.addresses.userId,
          street: schema.addresses.street,
          city: schema.addresses.city,
          province: schema.addresses.province,
          postalCode: schema.addresses.postalCode,
        },
      })
      .from(schema.users)
      .leftJoin(schema.addresses, eq(schema.users.id, schema.addresses.userId));

    return users.map((user) => ({
      ...user,
      address: user.address?.id ? user.address : undefined,
    }));
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw new Error("Failed to fetch users");
  }
}

export async function getUserById(id: number) {
  try {
    const result = await db
      .select({
        id: schema.users.id,
        firstname: schema.users.firstname,
        lastname: schema.users.lastname,
        birthdate: schema.users.birthdate,
        address: {
          id: schema.addresses.id,
          userId: schema.addresses.userId,
          street: schema.addresses.street,
          city: schema.addresses.city,
          province: schema.addresses.province,
          postalCode: schema.addresses.postalCode,
        },
      })
      .from(schema.users)
      .leftJoin(schema.addresses, eq(schema.users.id, schema.addresses.userId))
      .where(eq(schema.users.id, id))
      .limit(1);

    if (!result[0]) {
      throw new Error("User not found");
    }

    const user = result[0];
    return {
      ...user,
      address: user.address?.id ? user.address : undefined,
    };
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user");
  }
}

export async function createUser(data: CreateUserData) {
  try {
    await db.transaction(async (tx) => {
      const [user] = await tx
        .insert(schema.users)
        .values({
          firstname: data.firstname,
          lastname: data.lastname,
          birthdate: data.birthdate,
        })
        .returning();

      await tx.insert(schema.addresses).values({
        userId: user.id,
        street: data.address.street,
        city: data.address.city,
        province: data.address.province,
        postalCode: data.address.postalCode,
      });
    });

    revalidatePath("/");
  } catch (error) {
    console.error("Failed to create user:", error);
    throw new Error("Failed to create user");
  }
}

export async function updateUser(data: UpdateUserData) {
  try {
    await db.transaction(async (tx) => {
      await tx
        .update(schema.users)
        .set({
          firstname: data.firstname,
          lastname: data.lastname,
          birthdate: data.birthdate,
        })
        .where(eq(schema.users.id, data.id));

      // Check if address exists
      const existingAddress = await tx
        .select()
        .from(schema.addresses)
        .where(eq(schema.addresses.userId, data.id))
        .limit(1);

      if (existingAddress.length > 0) {
        await tx
          .update(schema.addresses)
          .set({
            street: data.address.street,
            city: data.address.city,
            province: data.address.province,
            postalCode: data.address.postalCode,
          })
          .where(eq(schema.addresses.userId, data.id));
      } else {
        await tx.insert(schema.addresses).values({
          userId: data.id,
          street: data.address.street,
          city: data.address.city,
          province: data.address.province,
          postalCode: data.address.postalCode,
        });
      }
    });

    revalidatePath("/");
  } catch (error) {
    console.error("Failed to update user:", error);
    throw new Error("Failed to update user");
  }
}

export async function deleteUser(id: number) {
  try {
    await db.delete(schema.users).where(eq(schema.users.id, id));
    revalidatePath("/users");
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw new Error("Failed to delete user");
  }
}
