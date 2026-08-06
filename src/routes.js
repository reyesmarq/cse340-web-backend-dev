import express from 'express';
import { showHomePage } from './controllers/index.js';
import {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationForm,
  processNewOrganizationForm,
  showEditOrganizationForm,
  processEditOrganizationForm,
} from './controllers/organizations.js';
import {
  showProjectsPage,
  showProjectDetailsPage,
  showNewProjectForm,
  processNewProjectForm,
  showEditProjectForm,
  processEditProjectForm,
} from './controllers/projects.js';
import {
  showCategoriesPage,
  showCategoryDetailsPage,
  showNewCategoryForm,
  processNewCategoryForm,
  showEditCategoryForm,
  processEditCategoryForm,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
} from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { processVolunteerSignup, processVolunteerRemoval } from './controllers/volunteers.js';
import {
  showUserRegistrationForm,
  processUserRegistrationForm,
  showLoginForm,
  processLoginForm,
  processLogout,
  requireLogin,
  requireRole,
  showDashboard,
  showUsersPage,
} from './controllers/users.js';
import { organizationValidation } from './validations/organizations.js';
import { projectValidation } from './validations/projects.js';
import { categoryValidation } from './validations/categories.js';
import { userValidation } from './validations/users.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
router.post(
  '/new-organization',
  requireRole('admin'),
  organizationValidation,
  processNewOrganizationForm
);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.post(
  '/edit-organization/:id',
  requireRole('admin'),
  organizationValidation,
  processEditOrganizationForm
);
router.get('/projects', showProjectsPage);
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);
router.get('/project/:id', showProjectDetailsPage);
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.post(
  '/edit-project/:id',
  requireRole('admin'),
  projectValidation,
  processEditProjectForm
);
router.get('/categories', showCategoriesPage);
router.get('/new-category', requireRole('admin'), showNewCategoryForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.post(
  '/edit-category/:id',
  requireRole('admin'),
  categoryValidation,
  processEditCategoryForm
);
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);
router.get('/register', showUserRegistrationForm);
router.post('/register', userValidation, processUserRegistrationForm);
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, showDashboard);
router.post('/volunteer/:projectId', requireLogin, processVolunteerSignup);
router.post('/unvolunteer/:projectId', requireLogin, processVolunteerRemoval);
router.get('/users', requireRole('admin'), showUsersPage);
router.get('/test-error', testErrorPage);

export default router;
