import { EncryptService } from '@/services/encrypt.service';

export const encryptPassword = async (params, next) => {
  if (params.model == 'User') {
    switch (params.action) {
      case 'create':
        params.args.data = EncryptService.encrypt(params);
        break;

      case 'update':
        if (params.args.data.password)
          params.args.data = EncryptService.encrypt(params);
        break;
      default:
        break;
    }
  }
  return next(params);
};
