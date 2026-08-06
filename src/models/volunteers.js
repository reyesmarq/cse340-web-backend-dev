import db from './db.js';

const addVolunteer = async (userId, projectId) => {
  const query = `
    INSERT INTO volunteer (user_id, project_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, project_id) DO NOTHING;
  `;

  await db.query(query, [userId, projectId]);
};

const removeVolunteer = async (userId, projectId) => {
  const query = `
    DELETE FROM volunteer
    WHERE user_id = $1 AND project_id = $2;
  `;

  await db.query(query, [userId, projectId]);
};

const isVolunteering = async (userId, projectId) => {
  const query = `
    SELECT 1
    FROM volunteer
    WHERE user_id = $1 AND project_id = $2;
  `;

  const result = await db.query(query, [userId, projectId]);

  return result.rows.length > 0;
};

const getVolunteerProjectsByUserId = async (userId) => {
  const query = `
    SELECT project.project_id, project.title, project.description, project.location, project.project_date, organization.name AS organization_name
      FROM public.volunteer
      JOIN public.project ON volunteer.project_id = project.project_id
      JOIN public.organization ON project.organization_id = organization.organization_id
      WHERE volunteer.user_id = $1
      ORDER BY project.project_date;
    `;

  const result = await db.query(query, [userId]);

  return result.rows;
};

export { addVolunteer, removeVolunteer, isVolunteering, getVolunteerProjectsByUserId };
