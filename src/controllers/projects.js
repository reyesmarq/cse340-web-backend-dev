import { getAllProjects } from '../models/projects.js';

const showProjectsPage = async (_, res) => {
  const projects = await getAllProjects();
  const title = 'Projects';

  res.render('projects', { title, projects });
};

export { showProjectsPage };
