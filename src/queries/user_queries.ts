export const userQueries = {
  getAllUsers: `SELECT id, first_name, last_name, email FROM users`,
  getUserById: `SELECT id, first_name, last_name, email FROM users WHERE id=$1`,
  createNewUser: `INSERT INTO users(first_name, last_name, email, pw_digest) VALUES ($1, $2, $3, $4) RETURNING *`,
  updateUser: `UPDATE users SET first_name=$1, last_name=$2, email=$3 where id=$4 RETURNING *`,
  getUserByEmail: `SELECT * FROM users WHERE email = $1`,
  deleteUserById: `DELETE FROM users WHERE id=$1 RETURNING id, first_name, last_name,email`
};