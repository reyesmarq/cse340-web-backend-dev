import db from './db.js';

const getAllProjects = async () => {
  const query = `
    SELECT project.project_id, project.title, project.description, project.location, project.project_date, organization.name AS organization_name
      FROM public.project
      JOIN public.organization ON project.organization_id = organization.organization_id
      ORDER BY project.project_date;
    `;

  const result = await db.query(query);

  return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
    SELECT project_id, organization_id, title, description, location, project_date
      FROM public.project
      WHERE organization_id = $1
      ORDER BY project_date;
    `;
  const queryParams = [organizationId];

  const result = await db.query(query, queryParams);

  return result.rows;
};

export { getAllProjects, getProjectsByOrganizationId };
