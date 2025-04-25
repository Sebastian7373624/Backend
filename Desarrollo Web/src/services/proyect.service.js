const  {ROLES} = require('../utils/constants');
const {proyects} = require('../model/proyects.model'); 


exports.createproyect = async (data) => { };

exports.getAllproyects = async () => {
    try {
        const proyects = await Proyect.findAll({
            include: [
                {
                    model: users,
                    as: 'administrator',
                    attributes: ['id', 'name']
                },
                {
                    model: users,
                    as: 'users',
                    attributes: ['id', 'name', 'email'],
                    through: { attributes: [] }
                }
            ]
        });

        return proyects;
    } catch (err) {
        throw new Error(`Error al obtener los proyectos: ${err.message}`);
    }
};

exports.getproyectsByuserId = async (user_id) => { };

exports.assignUsersToProyect = async (data) => {
    const proyect = await Proyect.findByPk(data.proyectId);
    if (!proyect) throw new Error('Proyecto no encontrado');

    const users = await User.findAll({ where: { id: data.userIds } });
    if (users.length !== data.userIds.length) throw new Error('Algunos usuarios no fueron encontrados');

    await proyect.addUsuarios(users);
    return await Proyect.findByPk(data.proyectId, {
        include: [
            {
                model: User,
                as: 'users',
                attributes: ['id', 'name', 'email'],
                through: { attributes: [] }
            }
        ]
    });
};

exports.removeUserFromProyect = async (data) => {
    const proyect = await Proyect.findByPk(data.proyectid);
    if (!proyect) throw new Error('Proyecto no encontrado');

    const user = await User.findByPk(data.userid);
    if (!user) throw new Error('Usuario no encontrado');

    await proyect.removeUsuario(user);
};

exports.updateProyect = async (data) => {
    const proyect = await Proyect.findByPk(data.proyectid);
    if (!proyect) throw new Error('Proyecto no encontrado');

    await proyect.update(data);
    return proyect;
};

exports.deleteProyect = async (id) => {
    const proyect = await Proyect.findByPk(id);
    if (!proyect) throw new Error('Proyecto no encontrado');

    await proyect.destroy();
    return { message: 'Proyecto eliminado correctamente' };
};

exports.getProyect = async (id) => {
    const proyect = await Proyect.findByPk(id, {
        include: [
            {
                model: user,
                as: 'users',
                attributes: ['id', 'name', 'email'],
                through: { attributes: [] }
            }
        ]
    });

    if (!proyect) throw new Error('Proyecto no encontrado');
    return proyect;
};