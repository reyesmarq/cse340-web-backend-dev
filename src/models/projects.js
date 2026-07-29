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

const getUpcomingProjects = async (numberOfProjects) => {
  const query = `
    SELECT project.project_id, project.organization_id, project.title, project.description, project.location, project.project_date, organization.name AS organization_name
      FROM public.project
      JOIN public.organization ON project.organization_id = organization.organization_id
      WHERE project.project_date >= CURRENT_DATE
      ORDER BY project.project_date ASC
      LIMIT $1;
    `;
  const queryParams = [numberOfProjects];

  const result = await db.query(query, queryParams);

  return result.rows;
};

const getProjectDetails = async (projectId) => {
  const query = `
    SELECT project.project_id, project.organization_id, project.title, project.description, project.location, project.project_date, organization.name AS organization_name
      FROM public.project
      JOIN public.organization ON project.organization_id = organization.organization_id
      WHERE project.project_id = $1;
    `;
  const queryParams = [projectId];

  const result = await db.query(query, queryParams);

  return result.rows.length > 0 ? result.rows[0] : null;
};

const createProject = async (title, description, location, date, organizationId) => {
  const query = `
    INSERT INTO public.project (title, description, location, project_date, organization_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING project_id;
  `;
  const queryParams = [title, description, location, date, organizationId];

  const result = await db.query(query, queryParams);

  return result.rows[0].project_id;
};

export {
  getAllProjects,
  getProjectsByOrganizationId,
  getUpcomingProjects,
  getProjectDetails,
  createProject,
};
