import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

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

app.get('/', (_, res) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`ENV ${ENV}`);
});
