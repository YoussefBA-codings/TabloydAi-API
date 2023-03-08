export const parseJson = async (params, next) => {
	if (params.model == 'User') {
		switch (params.action) {
			case 'create':
			case 'update':
				const user = params.args.data;
				if (!!JSON.stringify(user.fullName))
					user.fullName = JSON.stringify(user.fullName);
				params.args.data = user;
				break;

			default:
				break;
		}
	}

	return next(params);
};
