const sequalize = require('../sequelize')
const { DataTypes } = require('sequelize');


const Meeting = sequalize.define('meeting', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3,200]
        }
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    meetingDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Meeting;
