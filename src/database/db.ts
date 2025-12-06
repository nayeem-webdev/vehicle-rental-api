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

  await pool.query(`
    CREATE TABLE IF NOT EXISTS vehicles(
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(40) NOT NULL,
        type VARCHAR(4) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'suv')),
        registration_number VARCHAR(100) UNIQUE NOT NULL,
        daily_rent_price DECIMAL(10, 2) NOT NULL CHECK (daily_rent_price > 0),
        availability_status VARCHAR(9) NOT NULL DEFAULT 'available' CHECK (availability_status IN ('available', 'booked'))    
    )`);

  console.log("db connected");
};
