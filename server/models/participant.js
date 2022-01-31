const sequalize = require('../sequelize')
const { DataTypes } = require('sequelize');


const Participant = sequalize.define('participant', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5,200]
        }
    },
    meetingId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Participant;
