import pkg from "pg";
const {Pool} = pkg;

import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
});

export default pool;