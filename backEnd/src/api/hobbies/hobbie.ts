import * as Mongoose from 'mongoose';

export interface IHobbie extends Mongoose.Document {
	userId: string;
	name: string;
	passionLevel: string;
	year: string;
	createdAt: Date;
	updateAt: Date;
}

const Schema = Mongoose.Schema;

export const HobbieSchema = new Mongoose.Schema(
	{
		userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
		name: { type: String, required: true },
		passionLevel: String,
		year: String
	},
	{
		timestamps: true
	}
);

export const HobbieModel = Mongoose.model<IHobbie>('Hobbie', HobbieSchema);
