
import { Pool } from "pg";
import { text } from "stream/consumers";

const pool=new Pool({
    user:"postgres",
    host: "localhost",
    database:"postgres",
    password: "password",
    port:5432
})

export default pool;

