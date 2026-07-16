import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';

const ENV = (process.env.NODE_ENV ?? 'production').toLocaleLowerCase();
const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use((req, res, next) => {
  if (ENV === 'development') {
    console.log(`${req.method} ${req.url}`);
  }
  next();
});

app.use((req, res, next) => {
  res.locals.NODE_ENV = ENV;
  next();
});

app.get('/', (_, res) => {
  res.render('home', {
    title: 'Home',
  });
});

app.get('/organizations', async (_, res) => {
  const organizations = await getAllOrganizations();
  const title = 'Our Partner Organizations';

  res.render('organizations', { title, organizations });
});

app.get('/projects', async (_, res) => {
  const projects = await getAllProjects();
  const title = 'Projects';

  res.render('projects', { title, projects });
});

app.get('/categories', async (_, res) => {
  const categories = await getAllCategories();
  const title = 'Categories';

  res.render('categories', { title, categories });
});

app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${ENV}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});
