const proyectService = require('../services/proyect.service');

exports.assignUsersToProyect = async (req, res) => {
    try {
        const data = req.body;
        const updatedProyect = await proyectService.assignUsersToProyect(data);
        res.status(200).json(updatedProyect);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getProyectById = async (req, res) => {
    try {
        const { proyectId } = req.params;
        const proyect = await proyectService.getProyectById(proyectId);
        if (!proyect) return res.status(404).json({ message: 'Proyecto no encontrado' });
        res.status(200).json(proyect);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createproyect = async (req, res) => {
    try {
        const proyectData = req.body;
        const newProyect = await proyectService.createProyect(proyectData);
        res.status(201).json(newProyect);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllProyects = async (req, res) => {
    try {
        const proyects = await proyectService.getAllProyects();
        res.status(200).json(proyects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProyect = async (req, res) => {
    try {
        const { id } = req.params;
        const proyectData = req.body;

        const updatedProyect = await proyectService.updateProyect(id, proyectData);

        if (!updatedProyect) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        res.status(200).json({ message: 'Proyecto actualizado correctamente', proyect: updatedProyect });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteProyect = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProyect = await proyectService.deleteProyect(id);

        if (!deletedProyect) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        res.status(200).json({ message: 'Proyecto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.removeUserFromProyect = async (req, res) => {
    try {
        const data = req.body;
        await proyectService.removeUserFromProyect(data);
        res.status(200).json({ message: 'Usuario eliminado del proyecto correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
