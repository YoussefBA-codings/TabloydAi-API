import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
	getUsers(): string {
		return 'Users';
	}

	getUser(): string {
		return 'One User';
	}
}
