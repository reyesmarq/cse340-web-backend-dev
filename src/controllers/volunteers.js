import { addVolunteer, removeVolunteer } from '../models/volunteers.js';
import { getProjectDetails } from '../models/projects.js';

const processVolunteerSignup = async (req, res, next) => {
  try {
    const projectId = req.params.projectId;
    const project = await getProjectDetails(projectId);

    if (!project) {
      const err = new Error('Project Not Found');
      err.status = 404;
      return next(err);
    }

    await addVolunteer(req.session.user.user_id, projectId);

    req.flash('success', 'You are now volunteering for this project!');
    res.redirect(`/project/${projectId}`);
  } catch (error) {
    next(error);
  }
};

const processVolunteerRemoval = async (req, res, next) => {
  try {
    const projectId = req.params.projectId;

    await removeVolunteer(req.session.user.user_id, projectId);

    req.flash('success', 'You have been removed as a volunteer for this project.');
    const returnTo = req.body.returnTo === 'dashboard' ? '/dashboard' : `/project/${projectId}`;
    res.redirect(returnTo);
  } catch (error) {
    next(error);
  }
};

export { processVolunteerSignup, processVolunteerRemoval };
