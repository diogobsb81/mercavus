import * as chai from 'chai';
import { IUser } from '../../src/api/users/user';
import * as Configs from '../../src/configurations';
import * as Database from '../../src/database';
import * as Server from '../../src/server';
import * as Utils from '../utils';

const configDb = Configs.getDatabaseConfig();
const database = Database.init(configDb);
const assert = chai.assert;
const serverConfig = Configs.getServerConfigs();

describe('UserController Tests', () => {
	let server;

	before((done) => {
		Server.init(serverConfig, database).then((s) => {
			server = s;
			done();
		});
	});

	beforeEach((done) => {
		Utils.createSeedUserData(database, done);
	});

	afterEach((done) => {
		Utils.clearDatabase(database, done);
	});

	it('Create user', async () => {
		var user = {
			name: 'Lionel Messi'
		};

		const res = await server.inject({
			method: 'POST',
			url: serverConfig.routePrefix + '/users',
			payload: user
		});

		var responseBody: any = JSON.parse(res.payload);
		assert.equal(201, res.statusCode);
		assert.isNotNull(responseBody.token);
	});

	it('Create user invalid data', async () => {
		var user = {
			email: 'lionel@madrid.com',
			name: 'Lionel Messi'
		};

		const res = await server.inject({
			method: 'POST',
			url: serverConfig.routePrefix + '/users',
			payload: user
		});

		assert.equal(400, res.statusCode);
	});

	it('Get user Info', async () => {
		var user = Utils.createUserDummy();
		const res = await server.inject({
			method: 'GET',
			url: serverConfig.routePrefix + '/users/info'
		});

		var responseBody: IUser = <IUser>JSON.parse(res.payload);
		assert.equal(200, res.statusCode);
	});
});
