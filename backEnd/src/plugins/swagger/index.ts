import * as Hapi from 'hapi';
import { IPlugin } from '../interfaces';

const register = async (server: Hapi.Server): Promise<void> => {
	try {
		return server.register([
			require('inert'),
			require('vision'),
			{
				plugin: require('hapi-swagger'),
				options: {
					info: {
						title: 'Hobbies Api',
						description: 'Hobbie Api Documentation',
						version: '1.0'
					},
					tags: [
						{
							name: 'hobbies',
							description: 'Api hobbies interface.'
						},
						{
							name: 'users',
							description: 'Api users interface.'
						}
					],
					swaggerUI: true,
					documentationPage: true,
					documentationPath: '/docs'
				}
			}
		]);
	} catch (err) {
		console.log(`Error registering swagger plugin: ${err}`);
	}
};

export default (): IPlugin => {
	return {
		register,
		info: () => {
			return { name: 'Swagger Documentation', version: '1.0.0' };
		}
	};
};
