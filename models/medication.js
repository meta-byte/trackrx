module.exports = function (sequelize, DataTypes) {
    var Medication = sequelize.define("Medication", {
        name: {
            type: DataTypes.STRING,
            allownull: false,
            len: [1]
        },
        dosage: {
            type: DataTypes.STRING,
            allownull: false,
            len: [1]
        },
        quantity: {
            type: DataTypes.INTEGER,
            allownull: false,
        },
        frequency: {
            type: DataTypes.TEXT,
            allownull: false,
        },
        timestamp: {
            type: DataTypes.DATE,
            allownull: false,
        },

    });

    Medication.associate = function (models) {
        Medication.belongsTo(models.User, {
            foreignKey: {
                allownull: false
            }
        });
    };

    return Medication;
};