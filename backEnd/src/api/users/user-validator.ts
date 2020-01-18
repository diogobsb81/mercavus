import * as Joi from 'joi';

export const createUserModel = Joi.object().keys({
	name: Joi.string().required()
});
