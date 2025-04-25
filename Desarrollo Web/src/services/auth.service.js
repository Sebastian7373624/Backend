// Importa los módulos necesarios 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('../model/user.model');
const RolesPermisos = require('../model/roles_permisos.model');

// Carga las variables de entorno desde el archivo .env
dotenv.config();

// Obtiene la clave secreta para JWT desde las variables de entorno
const SECRET_KEY = process.env.JWT_SECRET || 'secreto123';

// Función para iniciar sesión de un usuario
exports.loginUser = async (email, password) => {
    try {
        console.log('Iniciando sesión...');
        // Verifica si el usuario existe en la base de datos 
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Verifica si la contraseña ingresada es correcta 
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {  
            throw new Error('Contraseña incorrecta');
        }

        // Obtiene los permisos del rol del usuario
        const permisosEncontrados = await RolesPermisos.findAll({
            where: { rol_id: user.rol_id },
            attributes: ['permisos_id']
        });

        // Mapea los permisos a un array
        const permisos = permisosEncontrados.map(rp => rp.permisos_id);

        // Genera un token JWT 
        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email, rol_id: user.rol_id, permisos },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        return token;

    } catch (error) {
        throw new Error(error.message || 'Error al iniciar sesión');
    }
};
