const User = require('./user.model');
const Proyect = require('./proyects.model');
const UserProyect = require('./users_proyects.model');

User.belongsToMany(Proyect, { through: UserProyect, foreignKey: 'user_id', as: 'userproyects' });
Proyect.belongsToMany(User, { through: UserProyect, foreignKey: 'proyect_id', as: 'proyectusers' });

Proyect.belongsTo(User, { foreignKey: 'administrator_id', as: 'administrator' });

module.exports = { User, Proyect, UserProyect };