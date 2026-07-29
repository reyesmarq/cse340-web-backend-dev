import { body } from 'express-validator';

const projectValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Project title is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('Project title must be between 3 and 200 characters')
    .escape(),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Project description is required')
    .isLength({ max: 500 })
    .withMessage('Project description cannot exceed 500 characters')
    .escape(),

  body('location')
    .trim()
    .notEmpty()
    .withMessage('Project location is required')
    .isLength({ max: 200 })
    .withMessage('Project location cannot exceed 200 characters')
    .escape(),

  body('projectDate')
    .notEmpty()
    .withMessage('Project date is required')
    .isISO8601()
    .withMessage('Please provide a valid date'),

  body('organizationId')
    .notEmpty()
    .withMessage('Please select an organization')
    .isInt()
    .withMessage('Please select a valid organization'),
];

export { projectValidation };
