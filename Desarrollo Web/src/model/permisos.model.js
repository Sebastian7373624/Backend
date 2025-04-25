// Importa DataTypes desde Sequelize 
const { DataTypes } = require('sequelize'); 

const sequalize = require.define('permisos', { 

    // Define la columna 'id' como clave primaria, entera y autoincremental 
    id: { 
        type: DataTypes.INTEGER, // Define que el tipo es entero
        primaryKey: true, //Define que el id es la llave primaria
        autoIncrement: true //Define que el id se autoincrementa
    },

    // Define la columna 'name' como cadena de texto, no nula y única
    name: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    }

}, {
    // Desactiva las marcas de tiempo predeterminadas en Sequelize 
    timestamps: false, 

    // Define manualmente el nombre de la tabla
    tableName: 'permisos',
});

// Exporta el modelo para su uso en otras partes del proyecto
module.exports = permisos; 
