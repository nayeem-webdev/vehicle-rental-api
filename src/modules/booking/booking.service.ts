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

    // Calculate Days
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
    const result = await pool.query(
      `SELECT 
      b.id, 
      b.customer_id,
      b.vehicle_id, 
      b.rent_start_date, 
      b.rent_end_date, 
      b.total_price, 
      b.status, 
      json_build_object('name', u.name, 'email', u.email) AS customer,
      json_build_object('vehicle_name', v.vehicle_name, 'registration_number', v.registration_number) AS vehicle
      FROM bookings b 
      LEFT JOIN users u ON b.customer_id = u.id 
      LEFT JOIN vehicles v ON b.vehicle_id = v.id
      ORDER BY b.id`
    );
    return result;
  }
  const result = await pool.query(
    `SELECT 
      b.id, 
      b.vehicle_id, 
      b.rent_start_date, 
      b.rent_end_date, 
      b.total_price, 
      b.status, 
      json_build_object('vehicle_name', v.vehicle_name, 'registration_number', v.registration_number, 'type', v.type) AS vehicle
      FROM bookings b 
      LEFT JOIN vehicles v ON b.vehicle_id = v.id
      WHERE b.customer_id = $1
      ORDER BY b.id`,
    [id]
  );
  return result;
};

const updateBookingInDB = async (
  role: string,
  bookingId: number,
  payload: Record<string, unknown>,
  customerId: number
) => {
  const { status } = payload;
  if (role === "customer") {
    try {
      const updateBooking = await pool.query(
        `SELECT * FROM bookings WHERE id=$1 FOR UPDATE`,
        [bookingId]
      );
      if (!updateBooking.rows[0]) {
        throw new Error(`Booking with id ${bookingId}: not found`);
      }
      if (updateBooking.rows[0].customer_id !== customerId) {
        throw new Error(
          `Unauthorized: You are not allowed to change other user's booking`
        );
      }
      const result = await pool.query(
        `
        UPDATE bookings SET status = $1 WHERE id = $2
    RETURNING *`,
        [status, bookingId]
      );
      await pool.query(
        `
      UPDATE vehicles SET availability_status = $1 WHERE id = $2`,
        ["available", result.rows[0].vehicle_id]
      );
      return result;
    } catch (error: any) {
      await pool.query("ROLLBACK");
      throw new Error(error.message);
    }
  }
  try {
    const updateBooking = await pool.query(
      `SELECT * FROM bookings WHERE id=$1 FOR UPDATE`,
      [bookingId]
    );
    if (!updateBooking.rows[0]) {
      throw new Error(`Booking with id ${bookingId}: not found`);
    }
    const result = await pool.query(
      `
        UPDATE bookings SET status = $1 WHERE id = $2
    RETURNING *`,
      [status, bookingId]
    );
    await pool.query(
      `
      UPDATE vehicles SET availability_status = $1 WHERE id = $2`,
      ["available", result.rows[0].vehicle_id]
    );
    const adminResult = {
      ...result.rows[0],
      vehicle: { availability_status: "available" },
    };
    return adminResult;
  } catch (error: any) {
    await pool.query("ROLLBACK");
    throw new Error(error.message);
  }
};

export const bookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  updateBookingInDB,
};
