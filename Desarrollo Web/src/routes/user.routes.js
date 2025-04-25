const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const { authenticateToken, checkRol } = require('../middleware/auth.middleware');
const {ROLES} = require('../utils/constants');
const errorHandler = require('../middleware/error.middleware');

// Ruta de usuarios
router.post('/users/create', authenticateToken, checkRol([ROLES.ADMIN]), userController.creatUser);
router.put('/users/update/:id', authenticateToken, checkRol([ROLES.ADMIN]), userController.updateUser);
router.get('/users', authenticateToken, checkRol([ROLES.ADMIN]), userController.getAllUsersByAdministratorId);
router.delete('/users/delete/:id', authenticateToken, checkRol([ROLES.ADMIN]), userController.deleteUser);
router.get('/users/rol/:id', authenticateToken, checkRol([ROLES.ADMIN]), userController.getAllUsersByRolId);

// Middleware para manejar errores
router.use(errorHandler);
module.exports = router;