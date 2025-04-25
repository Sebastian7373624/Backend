const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');

// Ruta para login
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);

module.exports = router;
