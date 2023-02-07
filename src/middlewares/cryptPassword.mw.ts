import bcrypt from 'bcrypt';

export const cryptPassword = async (params, next) => {
	if (params.action == 'create' && params.model == 'User') {
		const user = params.args.data;
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(user.password, salt);
		user.password = hash;
		params.args.data = user;
	}
	return next(params);
};
