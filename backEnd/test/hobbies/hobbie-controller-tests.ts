import * as chai from 'chai';
import * as Configs from '../../src/configurations';
import * as Database from '../../src/database';
import * as Server from '../../src/server';
import * as Utils from '../utils';

const configDb = Configs.getDatabaseConfig();
const database = Database.init(configDb);
const assert = chai.assert;
const serverConfig = Configs.getServerConfigs();

describe('HobbieController Tests', () => {
	let server;

	before((done) => {
		Server.init(serverConfig, database).then((s) => {
			server = s;
			done();
		});
	});

	beforeEach((done) => {
		Utils.createSeedHobbieData(database, done);
	});

	afterEach((done) => {
		Utils.clearDatabase(database, done);
	});
});
