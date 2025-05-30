import dotenv from "dotenv";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

dotenv.config();

// Database connection string - in production, use environment variables
const connectionString = process.env.DATABASE_URL!;

// Create postgres connection
const client = postgres(connectionString);

// Create drizzle database instance with schema
export const db = drizzle(client, { schema });

// Export schema for use in queries
export { schema };
