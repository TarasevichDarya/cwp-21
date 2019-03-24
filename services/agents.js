const CrudService = require('./crud');
const validator = require('../helpers/validation');

class AgentsService extends CrudService {

    async create(data) {
        const validationResult = validator.check('agent', data);

        if (validationResult.error) {
            return { code: 400, message: 'validation error' };
        }
        else {
            return super.create(data);
        }
    }

    async deBindFromOffice(data) {
        if (data.id != undefined) {
            const id = parseInt(data.id);

            return super.update(
                id,
                { officeId: null }
            )
        }
        throw this.errors.wrongCredentials;
    }

    async bindToOffice(data) {
        if (data.id != undefined && data.newOfficeId != undefined) {
            const id = parseInt(data.id);
            const officeID = parseInt(data.newOfficeId);

            return super.update(
                id,
                { officeId: officeID }
            )
        }
        throw this.errors.wrongCredentials;
    }

    async update(id, data) {
        const validationResultData = validator.check('agentUpd', data);

        if (validationResultData.error) {
            throw this.errors.wrongCredentials;
        }
        else {
            return super.update(id, data);
        }
    }

    async readProperties(id) {
        const agent = await this.read(id);

        if (!agent) {
            throw this.errors.invalidId;
        }

        return await agent.getProperties();
    }

    async delete(id) {
        const agent = await this.read(id);

        if (!agent) {
            throw this.errors.invalidId;
        }

        let properties = await agent.getProperties();

        properties.forEach(property => {
            property.update({ agentId: null });
        });
        super.delete(id);
        return { code: 200, message: 'OK' };
    }
}

module.exports = AgentsService;