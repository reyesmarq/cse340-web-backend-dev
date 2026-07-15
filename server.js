import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';

const ENV = (process.env.NODE_ENV ?? 'production').toLocaleLowerCase();
const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.get('/', (_, res) => {
  res.render('home', {
    title: 'Home',
  });
});

app.get('/organizations', (_, res) => {
  res.render('organizations', {
    title: 'Our Partner Organizations',
  });
});

app.get('/projects', (_, res) => {
  res.render('projects', {
    title: 'Projects',
  });
});

app.get('/categories', (_, res) => {
  res.render('categories', {
    title: 'Categories',
  });
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
