import { Pool } from "pg";
import { config } from "../config";

export const pool = new Pool({
  connectionString: config.db.dbString,
});

// Function to initialize the database
export const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(40) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL CHECK (LENGTH(password) >= 6),
        phone VARCHAR(11) NOT NULL,
        role VARCHAR(8) NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin'))
    )`);
  console.log("db connected");
};
