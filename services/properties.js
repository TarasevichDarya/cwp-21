const CrudService = require('./crud');
const validator = require('../helpers/validation');

class PropertiesService extends CrudService {
   
    async create(data){
        const validRes = validator.check('property', data);

        if(validRes.error){
            throw this.errors.wrongCredentials;
        }
        else{
            return super.create(data);
        }
    }

    async update(id, data){
        const validationResultData = validator.check('propertyUpd', data);

        if(validationResultData.error){
            throw this.errors.wrongCredentials;
        }
        else{
            return super.update(id, data);            
        }
    }

    async deBindFromAgent(data){
        if(data.id != undefined){
            const id = parseInt(data.id);

            return super.update(
                id,
                {agentId: null}
            )
        }
        throw this.errors.invalidId;
    }

    async bindToAgent(data) {
        if (data.id && data.agentId) {
            const id = parseInt(data.id);
            const agentID = parseInt(data.agentId);

            
            return super.update(
                id,
                { agentId: agentID }
            )
        }
        throw this.errors.invalidId;
    }
}

module.exports = PropertiesService;