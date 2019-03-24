const express = require('express');

module.exports = (
    officesService,
    agentsServices,
    propertiesServices,
    cacheService,
    config
) => {
    const router = express.Router();
    
    const officeController = require('./offices')(
        officesService,
        cacheService
    );

    const agentsController = require('./agents')(
        agentsServices,
        cacheService
    );
    
    const propertiesController = require('./properties')(
        propertiesServices,
        cacheService
    );

    router.use('/office', officeController);
    router.use('/agent', agentsController);
    router.use('/property', propertiesController);

    return router;
};