import { Controller, Get } from '@nestjs/common';
import { UserService } from '@/services/user.service';

@Controller()
export class UserController {
	constructor(private readonly appService: UserService) {}

	@Get('users')
	getUsers(): string {
		return this.appService.getUsers();
	}

	@Get('user/:id')
	getUser(): string {
		return this.appService.getUser();
	}
}
