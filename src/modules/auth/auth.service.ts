import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { pool } from "../../database/db";

interface SignupPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}

const signupUserIntoDB = async (payload: SignupPayload) => {
  const { name, email, password, phone, role } = payload;

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }
  if (!/^\d{11}$/.test(phone)) {
    throw new Error("Enter a valid 11 digit phone number");
  }
  const normalizedEmail = email.toLowerCase().trim();
  const hashedPassword = await bcrypt.hash(password, 10);
  const newRole = role ? role : "customer";
  const result = await pool.query(
    `INSERT INTO users (name, email, password, phone, role) VALUES($1,$2,$3,$4,$5) RETURNING id, name, email, phone, role`,
    [name, normalizedEmail, hashedPassword, phone, newRole]
  );
  return result;
};

const loginUserIntoDB = async (email: string, password: string) => {
  const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  const passwordMatch = await bcrypt.compare(password, user.rows[0].password);
  if (!passwordMatch) {
    throw new Error("Invalid credentials");
  }
  const payload = {
    id: user.rows[0].id,
    role: user.rows[0].role,
    name: user.rows[0].name,
    email: user.rows[0].email,
  };
  const secret =
    "f8e9d7c6b5a49382716150f4e3d2c1b0a9f8e7d6c5b4a392817160f5e4d3c2b1a0";
  const token = jwt.sign(payload, secret, { expiresIn: "7d" });
  return { user, token };
};

export const authServices = {
  loginUserIntoDB,
  signupUserIntoDB,
};
