import * as Hapi from 'hapi';
import * as Joi from 'joi';
import { IServerConfigurations } from '../../configurations';
import { IDatabase } from '../../database';
import HobbieController from './hobbie-controller';
import * as HobbieValidator from './hobbie-validator';

export default function(server: Hapi.Server, configs: IServerConfigurations, database: IDatabase) {
	const hobbieController = new HobbieController(configs, database);
	server.bind(hobbieController);

	server.route({
		method: 'GET',
		path: '/hobbies/{userId}',
		options: {
			//handler: hobbieController.getHobbieById,
			handler: (request, reply) => {
				let userId = request.params['userId'];
				return hobbieController.getHobbieById(userId);
			},
			tags: [ 'api', 'hobbie' ],
			description: 'Get hobbie by userId.',
			validate: {
				params: {
					userId: Joi.string().required()
				}
			},
			plugins: {
				'hapi-swagger': {
					responses: {
						'200': {
							description: 'hobbie founded.'
						},
						'404': {
							description: 'hobbie does not exists.'
						}
					}
				}
			}
		}
	});

	server.route({
		method: 'GET',
		path: '/hobbies',
		options: {
			handler: hobbieController.getHobbies,
			tags: [ 'api', 'hobbie' ],
			description: 'Get all hobbies.',
			validate: {
				query: {
					top: Joi.number().default(5),
					skip: Joi.number().default(0)
				}
			}
		}
	});

	server.route({
		method: 'DELETE',
		path: '/hobbies/{userId}',
		options: {
			handler: (request, reply) => {
				let userId = request.params['userId'];
				console.log(userId);
				return hobbieController.deleteHobbie(userId);
			},
			//handler: hobbieController.deleteHobbie,
			tags: [ 'api', 'hobbies' ],
			description: 'Delete hobbies by id.',
			validate: {
				params: {
					userId: Joi.string().required()
				}
			},
			plugins: {
				'hapi-swagger': {
					responses: {
						'200': {
							description: 'Deleted Task.'
						},
						'404': {
							description: 'Task does not exists.'
						}
					}
				}
			}
		}
	});

	server.route({
		method: 'POST',
		path: '/hobbies',
		options: {
			handler: hobbieController.createHobbie,
			tags: [ 'api', 'hobbies' ],
			description: 'Create a Hobbie.',
			validate: {
				payload: HobbieValidator.createHobbieModel
			},
			plugins: {
				'hapi-swagger': {
					responses: {
						'201': {
							description: 'Created Hobbie.'
						}
					}
				}
			}
		}
	});
}
