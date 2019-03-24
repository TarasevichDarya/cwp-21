module.exports = (Sequelize, config) => {
    const options = {
        host: config.host,
        dialect: config.dialect,
        logging: false,
        database: config.database,
        username:config.username,
        password:config.password,
        storage:config.storage,
        define: {
            timestamps: true,
            paranoid: true,
            defaultScope: {
                where: { deletedAt: { $eq: null }}
            }
        }
    }

    const sequelize = new Sequelize(options);
    const Agents = require('../models/agents')(Sequelize, sequelize);
    const Offices = require('../models/offices')(Sequelize, sequelize);
    const Property = require('../models/properties')(Sequelize, sequelize);

    Agents.hasMany(Property, {foreignKey: 'agentId'});
    Property.belongsTo(Agents, {constraints: false, foreignKey: 'agentId'});

    Offices.hasMany(Agents, {foreignKey: 'officeId'});
    Agents.belongsTo(Offices, {constraints: false, foreignKey: 'officeId'});

    return {
        agents: Agents,
        offices: Offices,
        properties: Property,

        sequelize,
        Sequelize,
    };
};