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

export { createUser };
