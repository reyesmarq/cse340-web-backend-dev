import { getAllCategories } from '../models/categories.js';

const showCategoriesPage = async (_, res) => {
  const categories = await getAllCategories();
  const title = 'Categories';

  res.render('categories', { title, categories });
};

export { showCategoriesPage };
