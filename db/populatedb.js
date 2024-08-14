#! /usr/bin/env node

import pkg from 'pg';
import dotenv from 'dotenv';

const {Client} = pkg;
dotenv.config();

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  first_name VARCHAR (255),
  last_name VARCHAR (255),
  password VARCHAR (255),
  status BOOLEAN,
  full_name TEXT GENERATED ALWAYS AS (first_name || ' '||last_name) STORED
);

CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 255 ),
  message VARCHAR (255),
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER REFERENCES users(id)
);

`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
