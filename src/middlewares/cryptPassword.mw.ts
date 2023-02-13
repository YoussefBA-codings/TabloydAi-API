import { EncryptService } from '@/services/encrypt.service';

export const cryptPassword = async (params, next) => {
	if (params.action == 'create' && params.model == 'User')
		params.args.data = EncryptService.encrypt(params);

	return next(params);
};
