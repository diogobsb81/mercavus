import * as Joi from 'joi';

export const createHobbieModel = Joi.object().keys({
	userId: Joi.string().required(),
	name: Joi.string().required(),
	passionLevel: Joi.string().required(),
	year: Joi.string().required()
});

export const updateHobbieModel = Joi.object().keys({
	userId: Joi.string().required(),
	name: Joi.string().required(),
	passionLevel: Joi.string().required(),
	year: Joi.string().required()
});
