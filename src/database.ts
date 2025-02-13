import { Pool } from "pg";

const pool=new Pool({
    user:"postgres",
    host: "localhost",
    database:"postgres",
    password: "password",
    port:5432
})

const connectDB = async () => {
    let client;
    try {
      client = await pool.connect();
      console.log("PostgreSQL is connected");
      client.release();
    } catch (error) {
      console.error(`Error connecting to PostgreSQL:`);
      process.exit(1);
    }
  };
  export { pool, connectDB };





