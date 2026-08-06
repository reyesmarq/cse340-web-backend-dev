import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import { createUser } from '../models/users.js';

const SALT_ROUNDS = 10;

const showUserRegistrationForm = (_, res) => {
  const title = 'Register';

  res.render('register', { title });
};

const processUserRegistrationForm = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const title = 'Register';
      return res.render('register', {
        title,
        errors: errors.array(),
        formData: req.body,
      });
    }

    const { name, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    await createUser(name, email, passwordHash);

    req.flash('success', 'Registration successful! You may now log in.');
    res.redirect('/');
  } catch (error) {
    if (error.code === '23505') {
      req.flash('error', 'An account with that email address already exists.');
    } else {
      req.flash('error', 'Registration failed. Please try again.');
    }
    res.redirect('/register');
  }
};

export { showUserRegistrationForm, processUserRegistrationForm };
