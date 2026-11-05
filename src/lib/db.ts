import { neon } from "@neondatabase/serverless";

// One shared database client. DATABASE_URL lives in .env.local (and in Vercel's
// environment variables), never in the code.
// Queries are written as sql`... ${value} ...`: the driver sends values separately
// from the SQL text (a parameterized query), which prevents SQL injection.
export const sql = neon(process.env.DATABASE_URL!);
