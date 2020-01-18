import * as Database from '../src/database';

export function createHobbieDummy(userId?: string, name?: string, passionLevel?: string, year?: string) {
	var user = {
		name: name || 'dummy hobbie'
	};

	if (userId) {
		user['userId'] = userId;
	}

	return user;
}

export function createUserDummy(email?: string) {
	var user = {
		name: 'Lionel Messi'
	};

	return user;
}

export function clearDatabase(database: Database.IDatabase, done: MochaDone) {
	var promiseUser = database.userModel.remove({});
	var promiseHobbie = database.hobbieModel.remove({});

	Promise.all([ promiseUser, promiseHobbie ])
		.then(() => {
			done();
		})
		.catch((error) => {
			console.log(error);
		});
}

export function createSeedHobbieData(database: Database.IDatabase, done: MochaDone) {
	return database.userModel
		.create(createUserDummy())
		.then((user) => {
			return Promise.all([
				database.hobbieModel.create(createHobbieDummy(user._id, 'Soccer', 'Low', '2020')),
				database.hobbieModel.create(createHobbieDummy(user._id, 'Volley', 'Medium', '2019')),
				database.hobbieModel.create(createHobbieDummy(user._id, 'Snooker', 'High', '2018'))
			]);
		})
		.then((hobbie) => {
			done();
		})
		.catch((error) => {
			console.log(error);
		});
}

export function createSeedUserData(database: Database.IDatabase, done: MochaDone) {
	database.userModel
		.create(createUserDummy())
		.then((user) => {
			done();
		})
		.catch((error) => {
			console.log(error);
		});
}
