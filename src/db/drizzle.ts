import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

config({ path: ".env" });

// Create PostgreSQL connection
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);

// Create Drizzle ORM instance
export const db = drizzle(client);
