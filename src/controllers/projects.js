import { validationResult } from 'express-validator';
import {
  getUpcomingProjects,
  getProjectDetails,
  createProject,
  updateProject,
} from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';
import { getAllOrganizations } from '../models/organizations.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (_, res) => {
  const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
  const title = 'Upcoming Service Projects';

  res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res, next) => {
  const projectId = req.params.id;
  const project = await getProjectDetails(projectId);

  if (!project) {
    const err = new Error('Project Not Found');
    err.status = 404;
    return next(err);
  }

  const categories = await getCategoriesByProjectId(projectId);
  const title = 'Project Details';

  res.render('project', { title, project, categories });
};

const showNewProjectForm = async (_, res) => {
  const organizations = await getAllOrganizations();
  const title = 'Create New Project';

  res.render('new-project', { title, organizations });
};

const processNewProjectForm = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const organizations = await getAllOrganizations();
      const title = 'Create New Project';
      return res.render('new-project', {
        title,
        organizations,
        errors: errors.array(),
        formData: req.body,
      });
    }

    const { title, description, location, projectDate, organizationId } = req.body;

    const projectId = await createProject(title, description, location, projectDate, organizationId);

    req.flash('success', 'Project added successfully!');
    res.redirect(`/project/${projectId}`);
  } catch (error) {
    next(error);
  }
};

const showEditProjectForm = async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);

    if (!project) {
      const err = new Error('Project Not Found');
      err.status = 404;
      return next(err);
    }

    const organizations = await getAllOrganizations();
    const title = 'Edit Project';
    res.render('edit-project', { title, project, organizations });
  } catch (error) {
    next(error);
  }
};

const processEditProjectForm = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const projectId = req.params.id;

    if (!errors.isEmpty()) {
      const project = await getProjectDetails(projectId);
      const organizations = await getAllOrganizations();
      const title = 'Edit Project';
      return res.render('edit-project', {
        title,
        project,
        organizations,
        errors: errors.array(),
        formData: req.body,
      });
    }

    const { title, description, location, projectDate, organizationId } = req.body;

    await updateProject(projectId, title, description, location, projectDate, organizationId);

    req.flash('success', 'Project updated successfully!');
    res.redirect(`/project/${projectId}`);
  } catch (error) {
    next(error);
  }
};

export {
  showProjectsPage,
  showProjectDetailsPage,
  showNewProjectForm,
  processNewProjectForm,
  showEditProjectForm,
  processEditProjectForm,
};
