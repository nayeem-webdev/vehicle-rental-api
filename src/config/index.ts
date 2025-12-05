import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",

  db: {
    dbString: process.env.DB_CONNECTION_STRING,
  },

  jwt: {
    secret: process.env.JWT_SECRET || "default_dev_secret",
    expire: process.env.JWT_EXPIRE || "7d",
  },
};
