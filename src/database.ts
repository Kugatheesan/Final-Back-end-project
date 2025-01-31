import { Pool } from "pg";
import { text } from "stream/consumers";

const pool=new Pool({
    // user:"postgres",
    // host: "localhost",
    // database:"postgres",
    // password: "12345678",
    // port:5432

    user:"myuser",
    host: "localhost",
    database:"postgres",
    password: "password",
    port:5432
})

export const query = ( text: string,params?: any[]) => {
    return pool.query(text,params)
}