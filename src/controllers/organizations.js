import { validationResult } from 'express-validator';
import {
  getAllOrganizations,
  getOrganizationDetails,
  createOrganization,
} from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';

const showOrganizationsPage = async (_, res) => {
  const organizations = await getAllOrganizations();
  const title = 'Our Partner Organizations';

  res.render('organizations', { title, organizations });
};

const showOrganizationDetailsPage = async (req, res, next) => {
  const organizationId = req.params.id;
  const organizationDetails = await getOrganizationDetails(organizationId);

  if (!organizationDetails) {
    const err = new Error('Organization Not Found');
    err.status = 404;
    return next(err);
  }

  const projects = await getProjectsByOrganizationId(organizationId);
  const title = 'Organization Details';

  res.render('organization', { title, organizationDetails, projects });
};

const showNewOrganizationForm = (_, res) => {
  const title = 'Create New Organization';

  res.render('new-organization', { title });
};

const processNewOrganizationForm = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const title = 'Create New Organization';
      return res.render('new-organization', {
        title,
        errors: errors.array(),
        formData: req.body,
      });
    }

    const { name, description, contactEmail } = req.body;

    const organizationId = await createOrganization(name, description, contactEmail);

    req.flash('success', 'Organization added successfully!');
    res.redirect(`/organization/${organizationId}`);
  } catch (error) {
    next(error);
  }
};

export {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationForm,
  processNewOrganizationForm,
};
