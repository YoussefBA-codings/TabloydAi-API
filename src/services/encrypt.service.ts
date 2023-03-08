import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class EncryptService {
  constructor() {}

  static encrypt = (params) => {
    const user = params.args.data;
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    return user;
  };

  static decrypt = (payload, hash) => {
    return bcrypt.compareSync(payload, hash);
  };
}
