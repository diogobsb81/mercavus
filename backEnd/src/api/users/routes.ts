import * as Hapi from 'hapi';
import { IServerConfigurations } from '../../configurations';
import { IDatabase } from '../../database';
import UserController from './user-controller';
import * as UserValidator from './user-validator';

export default function(server: Hapi.Server, serverConfigs: IServerConfigurations, database: IDatabase) {
	const userController = new UserController(serverConfigs, database);
	server.bind(userController);

	server.route({
		method: 'GET',
		path: '/users/info',
		options: {
			handler: userController.infoUser,
			tags: [ 'api', 'users' ],
			description: 'Get user info.',
			plugins: {
				'hapi-swagger': {
					responses: {
						'200': {
							description: 'User founded.'
						},
						'401': {
							description: 'Please login.'
						}
					}
				}
			}
		}
	});

	server.route({
		method: 'POST',
		path: '/users',
		options: {
			handler: userController.createUser,
			tags: [ 'api', 'users' ],
			description: 'Create a user.',
			validate: {
				payload: UserValidator.createUserModel
			},
			plugins: {
				'hapi-swagger': {
					responses: {
						'201': {
							description: 'User created.'
						}
					}
				}
			}
		}
	});
}
