const CrudService = require('./crud');
const validator = require('../helpers/validation');

class OfficesService extends CrudService {
  
    async create(data) {
        const validationResult = validator.check('office', data);
        
        if(validationResult.error){
            throw this.errors.wrongCredentials;
        }
        else{
            return super.create(data);
        }
    }

    async update(id, data) {
        const validationResultData = validator.check('officeUpd', data);

        if(validationResultData.error){
            throw this.errors.wrongCredentials;
        }
        else{
            return super.update(id, data);            
        }
    }

    async readAgents(id) {
        const office = await this.read(id);

        if(!office){
            throw this.errors.notFound;
        }

        return await office.getAgents();
    }

    async delete(id){
        const office = await this.read(id);

        if(!office){
            throw this.errors.notFound;
        }

        let agents = await office.getAgents();

        agents.forEach(agent => {
            agent.update({officeId: null});
        });    
        super.delete(id);
        return {code: 200, message: 'OK'};    
    }
}

module.exports = OfficesService;