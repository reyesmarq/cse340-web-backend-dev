import {
  getAllCategories,
  getCategoryDetails,
  getProjectsByCategoryId,
} from '../models/categories.js';

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

export { showCategoriesPage, showCategoryDetailsPage };
