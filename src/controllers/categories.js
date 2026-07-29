import { validationResult } from 'express-validator';
import {
  getAllCategories,
  getCategoryDetails,
  getProjectsByCategoryId,
  getCategoriesByProjectId,
  createCategory,
  updateCategory,
  updateCategoryAssignments,
} from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';

const showCategoriesPage = async (_, res) => {
  const categories = await getAllCategories();
  const title = 'Categories';

  res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res, next) => {
  const categoryId = req.params.id;
  const category = await getCategoryDetails(categoryId);

  if (!category) {
    const err = new Error('Category Not Found');
    err.status = 404;
    return next(err);
  }

  const projects = await getProjectsByCategoryId(categoryId);
  const title = 'Category Details';

  res.render('category', { title, category, projects });
};

const showNewCategoryForm = (_, res) => {
  const title = 'Create New Category';

  res.render('new-category', { title });
};

const processNewCategoryForm = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const title = 'Create New Category';
      return res.render('new-category', {
        title,
        errors: errors.array(),
        formData: req.body,
      });
    }

    const { name } = req.body;

    const categoryId = await createCategory(name);

    req.flash('success', 'Category added successfully!');
    res.redirect(`/category/${categoryId}`);
  } catch (error) {
    next(error);
  }
};

const showEditCategoryForm = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await getCategoryDetails(categoryId);

    if (!category) {
      const err = new Error('Category Not Found');
      err.status = 404;
      return next(err);
    }

    const title = 'Edit Category';
    res.render('edit-category', { title, category });
  } catch (error) {
    next(error);
  }
};

const processEditCategoryForm = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const categoryId = req.params.id;

    if (!errors.isEmpty()) {
      const category = await getCategoryDetails(categoryId);
      const title = 'Edit Category';
      return res.render('edit-category', {
        title,
        category,
        errors: errors.array(),
        formData: req.body,
      });
    }

    const { name } = req.body;

    await updateCategory(categoryId, name);

    req.flash('success', 'Category updated successfully!');
    res.redirect(`/category/${categoryId}`);
  } catch (error) {
    next(error);
  }
};

const showAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;

  const projectDetails = await getProjectDetails(projectId);
  const categories = await getAllCategories();
  const assignedCategories = await getCategoriesByProjectId(projectId);

  const title = 'Assign Categories to Project';

  res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;
  const selectedCategoryIds = req.body.categoryIds || [];

  const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
  await updateCategoryAssignments(projectId, categoryIdsArray);
  req.flash('success', 'Categories updated successfully.');
  res.redirect(`/project/${projectId}`);
};

export {
  showCategoriesPage,
  showCategoryDetailsPage,
  showNewCategoryForm,
  processNewCategoryForm,
  showEditCategoryForm,
  processEditCategoryForm,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
};
