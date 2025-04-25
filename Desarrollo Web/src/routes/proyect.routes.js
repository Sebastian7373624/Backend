const express = require('express');
const router = express.Router();
const proyectController = require('../controller/proyect.controller');
const { ROLES } = require('../utils/constants');
const { authenticateToken, checkRol } = require('../middleware/auth.middleware');

router.post('/proyects/create', authenticateToken, checkRol([ROLES.ADMIN]), proyectController.createproyect);
router.put('/proyects/update/:id', authenticateToken, checkRol([ROLES.ADMIN]), proyectController.updateProyect);
router.delete('/proyects/delete/:id', authenticateToken, checkRol([ROLES.ADMIN]), proyectController.deleteProyect);
router.get('/proyects', authenticateToken, checkRol([ROLES.ADMIN, ROLES.USER]), proyectController.getAllProyects);
router.get('/proyects/:id', authenticateToken, checkRol([ROLES.ADMIN, ROLES.USER]), proyectController.getProyectById);

router.post('/proyects/associate', authenticateToken, checkRol([ROLES.ADMIN]), proyectController.assignUsersToProyect);
router.delete('/proyects/disassociate', authenticateToken, checkRol([ROLES.ADMIN]), proyectController.removeUserFromProyect);

module.exports = router;
