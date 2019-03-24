const CrudController = require('./crud');

class PropertiesController extends CrudController {
    constructor(propertyService, cacheService) {
        super(propertyService, cacheService);

        this.deBindFromAgent = this.deBindFromAgent.bind(this);
        this.bindToAgent = this.bindToAgent.bind(this);

        this.routes['/debind'] = [{ method: 'post', cb: this.deBindFromAgent }];
        this.routes['/bind'] = [{ method: 'post', cb: this.bindToAgent }];

        this.registerRoutes();
    }

    async deBindFromAgent(req, res) {
        const result = await this.service.deBindFromAgent(req.body);

        res.json(result);
    }

    async bindToAgent(req, res) {
        const result = await this.service.bindToAgent(req.body);

        res.json(result);
    }
}

module.exports = (propertiesService, cacheService) => {
    const controller = new PropertiesController(
        propertiesService,
        cacheService
    );

    return controller.router;
}