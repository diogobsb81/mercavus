import * as Boom from 'boom';
import * as Hapi from 'hapi';
import { IServerConfigurations } from '../../configurations';
import { IDatabase } from '../../database';
import { IRequest } from '../../interfaces/request';

export default class UserController {
	private database: IDatabase;
	private configs: IServerConfigurations;

	constructor(configs: IServerConfigurations, database: IDatabase) {
		this.database = database;
		this.configs = configs;
	}

	public async createUser(request: IRequest, h: Hapi.ResponseToolkit) {
		try {
			let user: any = await this.database.userModel.create(request.payload);
			return h.response({ user }).code(201);
		} catch (error) {
			return Boom.badImplementation(error);
		}
	}

	public async infoUser(request: IRequest, h: Hapi.ResponseToolkit) {
		let user = await this.database.userModel.find();
		return user;
	}
}
