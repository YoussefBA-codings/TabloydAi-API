const { TOKEN_KEY } = process.env;

import { Injectable } from '@nestjs/common';
import { sign, verify, JwtPayload } from 'jsonwebtoken';

@Injectable()
export class TokenService {
	constructor() {}

	public getToken(payload: object, opts?: object): Promise<string> {
		return new Promise((resolve, reject) => {
			sign(payload, TOKEN_KEY, { ...opts }, (err, encoded) => {
				if (err) {
				} else resolve(encoded);
			});
		});
	}

	public async decodeToken(
		tokenToDecode: string,
		opts?: object,
	): Promise<JwtPayload> {
		return new Promise((resolve, reject) => {
			verify(tokenToDecode, TOKEN_KEY, { ...opts }, (err, decoded) => {
				if (err) {
				} else resolve(decoded as JwtPayload);
			});
		});
	}
}
