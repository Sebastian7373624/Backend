const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const KEY = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ') [1]; //Cambiar (1) por corchetes

    if(!token) {
        return res.status(401).json({ message: 'Acceso denegado, token no proporcionado' });
        }
        //codigo
        jwt.verify(token,KEY, (err, user) => {
            if (err){
                return res.status(403).json({ message: 'Token no valido' });
            }
            req.user= user;
            next();
        });
    };


const checkRol = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.rol)) {
            return res.status(403).json({ message: 'Acceso denegado, rol no autorizado' });
        }
        next();
    };
};

module.exports = { authenticateToken, checkRol};