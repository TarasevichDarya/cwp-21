const CrudController = require('./crud');

class OfficeController extends CrudController {
    constructor(officeService, cacheService) {
        super(officeService, cacheService);
        

        this.readAgents = this.readAgents.bind(this);

        this.routes['/agents/:id'] = [{method: 'get', cb: this.readAgents}];
        
        this.registerRoutes();
    }

    async readAgents(req, res) {
        const agents = await this.service.readAgents(req.params.id);

        res.json(agents);
    }    
}

module.exports = (usersService, cacheService) => {
    const controller = new OfficeController(
        usersService,
        cacheService
    );

    return controller.router;
}