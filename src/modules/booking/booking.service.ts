import { pool } from "../../database/db";

const createBookingIntoDB = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  try {
    const bookedVehicle = await pool.query(
      `SELECT daily_rent_price,  vehicle_name, availability_status FROM vehicles WHERE id=$1 FOR UPDATE`,
      [vehicle_id]
    );

    if (!bookedVehicle.rows[0]) {
      throw new Error(`Vehicle with id ${vehicle_id}: not found`);
    }

    const { daily_rent_price, availability_status, vehicle_name } =
      bookedVehicle.rows[0];

    if (availability_status !== "available") {
      throw new Error("Vehicle is not available for booking");
    }

    // Calculate difference in milliseconds
    const timeDiffMs =
      new Date(rent_end_date as string).getTime() -
      new Date(rent_start_date as string).getTime();
    const bookedDays = Math.ceil(timeDiffMs / (1000 * 3600 * 24));

    if (bookedDays <= 0) {
      throw new Error("Rent end date must be after start date.");
    }

    const totalPrice = bookedDays * parseFloat(daily_rent_price);

    const result = await pool.query(
      `
      INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *
    `,
      [
        customer_id,
        vehicle_id,
        rent_start_date,
        rent_end_date,
        totalPrice,
        "active",
      ]
    );

    // Update Vehicle Status
    await pool.query(
      `
        UPDATE vehicles SET availability_status = $1 WHERE id = $2
    `,
      ["booked", vehicle_id]
    );

    const dataFormat = {
      id: result.rows[0].id,
      customer_id: result.rows[0].customer_id,
      vehicle_id: result.rows[0].vehicle_id,
      rent_start_date: result.rows[0].rent_start_date
        .toISOString()
        .slice(0, 10),
      rent_end_date: result.rows[0].rent_end_date.toISOString().slice(0, 10),
      total_price: result.rows[0].total_price,
      status: result.rows[0].status,
      vehicle: {
        vehicle_Name: vehicle_name,
        daily_rent_price: daily_rent_price,
      },
    };
    return dataFormat;
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
};

const getAllBookingFromDB = async (role: string, id: number) => {
  if (role === "admin") {
    const result = await pool.query(`SELECT * FROM bookings`);
    return result;
  }
  const result = await pool.query(
    `SELECT * FROM bookings WHERE customer_id=$1`,
    [id]
  );
  return result;
};
export const bookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
};
