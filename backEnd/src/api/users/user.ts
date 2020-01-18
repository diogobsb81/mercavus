import * as Mongoose from 'mongoose';

export interface IUser extends Mongoose.Document {
	name: string;
}

export const UserSchema = new Mongoose.Schema(
	{
		name: { type: String, required: true }
	},
	{
		timestamps: true
	}
);

export const UserModel = Mongoose.model<IUser>('User', UserSchema);
