import bcrypt from 'bcrypt';
import db from './db.js';

const createUser = async (name, email, passwordHash) => {
  const roleQuery = `
    SELECT role_id
    FROM public.roles
    WHERE role_name = 'user';
  `;
  const roleResult = await db.query(roleQuery);
  const roleId = roleResult.rows[0].role_id;

  const query = `
    INSERT INTO public.users (name, email, password_hash, role_id)
    VALUES ($1, $2, $3, $4)
    RETURNING user_id;
  `;
  const queryParams = [name, email, passwordHash, roleId];

  const result = await db.query(query, queryParams);

  return result.rows[0].user_id;
};

const findUserByEmail = async (email) => {
  const query = `
    SELECT user_id, name, email, password_hash, role_id
    FROM public.users
    WHERE email = $1;
  `;
  const queryParams = [email];

  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
};

const verifyPassword = async (password, passwordHash) => {
  return bcrypt.compare(password, passwordHash);
};

const authenticateUser = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user) {
    return null;
  }

  const isValid = await verifyPassword(password, user.password_hash);

  if (!isValid) {
    return null;
  }

  const { password_hash, ...safeUser } = user;

  return safeUser;
};

export { createUser, authenticateUser };
