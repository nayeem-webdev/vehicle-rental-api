import { Pool } from "pg";

export const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_8naTlgtHV5vZ@ep-cold-mountain-a86dkcib-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require",
});

// Function to initialize the database
export const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(40) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone VARCHAR(11) NOT NULL,
        role VARCHAR(8) NOT NULL DEFAULT 'customer',
        CHECK (role IN ('customer', 'admin'))
        )`);
  console.log("db connected");
};
