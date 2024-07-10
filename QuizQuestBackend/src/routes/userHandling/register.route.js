import express from 'express';
import { signup } from '../../controllers/register.controller.js';
import { login } from '../../controllers/signIn.controller.js';
import { auth } from '../../middlewares/auth.js';
import { test } from '../../controllers/test.js';
const router = express.Router();

router.post('/register', signup);
router.post('/login', login);
router.get('/test',auth, test);

export default router;
