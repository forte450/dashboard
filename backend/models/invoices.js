const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('invoices', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        invoice_start_date: {
            type: DataTypes.DATE,
            allowNull: true, // This allows the field to be nullable
            defaultValue: null // This sets the default value to null, or you could use Sequelize.NOW for the current date
        },
        ending: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: ''
        },
        repeat_every: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        country_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: ''
        },
        occurrences: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: 0
        },
        country_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: ''
        },
        country_code: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: ''
        },
        customer_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: ''
        },
        amount: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: ''
        },
        mobile_no: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: ''
        },
        message: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: 0
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        createdAt: {
            field: 'created_at',
            type: Sequelize.DATE,
        },
        updatedAt: {
            field: 'updated_at',
            type: Sequelize.DATE,
        },
    }, {
        sequelize,
        tableName: 'invoices',
        timestamps: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "id" },
                ]
            },
        ]
    });
};
