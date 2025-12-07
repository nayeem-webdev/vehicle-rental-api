import { pool } from "../../database/db";

const addVehicleIntoDB = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1,$2,$3,$4,$5) RETURNING id, vehicle_name, type, registration_number, daily_rent_price, availability_status`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  return result;
};

const updateVehicleInDB = async (
  payload: Record<string, unknown>,
  ID: string
) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const isIDValid = await pool.query(`SELECT id FROM vehicles WHERE id=$1`, [
    ID,
  ]);
  if (isIDValid.rowCount === 0) {
    throw new Error("Vehicle does not exist");
  }
  const result = await pool.query(
    `UPDATE vehicles SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5 WHERE id=$6 RETURNING id, vehicle_name, type, registration_number, daily_rent_price, availability_status`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      ID,
    ]
  );
  return result;
};

const deleteVehicleFromDB = async (ID: string) => {
  const isIDValid = await pool.query(`SELECT id FROM vehicles WHERE id=$1`, [
    ID,
  ]);
  if (isIDValid.rowCount === 0) {
    throw new Error("Vehicle does not exist");
  }
  const result = await pool.query(`DELETE FROM vehicles WHERE id=$1`, [ID]);
  return result;
};

const getAllVehiclesFromDB = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result;
};

const getSingleVehicleFromDB = async (ID: string) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [ID]);
  return result;
};

export const vehicleServices = {
  addVehicleIntoDB,
  getAllVehiclesFromDB,
  getSingleVehicleFromDB,
  updateVehicleInDB,
  deleteVehicleFromDB,
};
