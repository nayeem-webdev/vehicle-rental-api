import { pool } from "../../database/db";

// Get all users from the database
const getAllUsersFromDB = async () => {
  const result = await pool.query(
    "SELECT id, name, email, phone, role FROM users"
  );
  return result;
};

// Update user in the database
const updateUserInDB = async (payload: Record<string, unknown>, ID: string) => {
  const { name, email, phone, role } = payload;
  if (!/^\d{11}$/.test(phone as string)) {
    throw new Error("Enter a valid 11 digit phone number");
  }
  const isIDValid = await pool.query(`SELECT id FROM users WHERE id=$1`, [ID]);
  if (isIDValid.rowCount === 0) {
    throw new Error("User does not exist");
  }
  const result = await pool.query(
    `UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING id, name, email, phone, role`,
    [name, email, phone, role, ID]
  );
  return result;
};

const deleteUserFromDB = async (ID: string) => {
  const isIDValid = await pool.query(`SELECT id FROM users WHERE id=$1`, [ID]);
  if (isIDValid.rowCount === 0) {
    throw new Error("User does not exist");
  }
  const result = await pool.query(`DELETE FROM users WHERE id=$1`, [ID]);
  return result;
};

export const userServices = {
  getAllUsersFromDB,
  updateUserInDB,
  deleteUserFromDB,
};
