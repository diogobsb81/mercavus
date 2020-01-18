export class User {
	_id?: string;
	name?: string;
	hobbies?: Hobbies;
}

export class Hobbies {
	_id?: string;
	userId?: string;
	name?: string;
	passionLevel?: string;
	year?: string;
}
