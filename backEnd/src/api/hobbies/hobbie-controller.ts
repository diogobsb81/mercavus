import * as Boom from 'boom';
import * as Hapi from 'hapi';
import { IServerConfigurations } from '../../configurations';
import { IDatabase } from '../../database';
import { IRequest } from '../../interfaces/request';
import { IHobbie } from './hobbie';

export default class HobbieController {
	private database: IDatabase;
	private configs: IServerConfigurations;

	constructor(configs: IServerConfigurations, database: IDatabase) {
		this.configs = configs;
		this.database = database;
	}

	public async createHobbie(request: IRequest, h: Hapi.ResponseToolkit) {
		var newHobbie: IHobbie = <IHobbie>request.payload;

		try {
			let hobbie: IHobbie = await this.database.hobbieModel.create(newHobbie);
			return h.response(hobbie).code(201);
		} catch (error) {
			return Boom.badImplementation(error);
		}
	}

	public async deleteHobbie(id) {
		let deletedHobbie = await this.database.hobbieModel.findOneAndRemove({
			_id: id
		});
		if (deletedHobbie) {
			return deletedHobbie;
		} else {
			return Boom.notFound();
		}
	}

	public async getHobbieById(userId) {
		let hobbie = await this.database.hobbieModel.find({ userId }).lean(true);
		if (hobbie) {
			return hobbie;
		} else {
			return null;
		}
	}

	public async getHobbies(request: IRequest, h: Hapi.ResponseToolkit) {
		let hobbies = await this.database.hobbieModel.find();
		return hobbies;
	}
}
