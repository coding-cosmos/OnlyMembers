import pool from "./pool.js";

async function insertUser(firstname, lastname, username, password) {
  await pool.query(
    "INSERT INTO users(first_name,last_name,username,password) VALUES ($1,$2,$3,$4)",
    [firstname, lastname, username, password]
  );
}

async function findUser(username) {
  const {rows} = await pool.query('SELECT * FROM users WHERE username = ($1)',[username]);
  return rows[0];
}

async function findUserById(id) {
  const {rows} = await pool.query('SELECT * FROM users WHERE id = ($1)',[id]);
  return rows[0];
}

async function changeStatus(id,status) {
  await pool.query('UPDATE users SET status = ($2) WHERE id = ($1)',[id,status]);
}

async function addPost(title,message,user_id) {
  await pool.query(
    "INSERT INTO posts(title,message,user_id) VALUES ($1,$2,$3)",
    [title, message, user_id]
  );
}

async function getPosts(){
  const {rows} = await pool.query('SELECT * FROM posts INNER JOIN users ON posts.user_id = users.id');
  return rows;
}

export default { insertUser ,findUser,findUserById,changeStatus,addPost,getPosts};
