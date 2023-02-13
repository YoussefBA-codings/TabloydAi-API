import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from '@/services/login.service';

@Controller('/api')
export class LoginController {
	constructor(private readonly appService: LoginService) {}

	@Post('/login')
	async login(
		@Body('userName') userName: string,
		@Body('password') password: string,
	): Promise<object> {
		return { token: await this.appService.login(userName, password) };
	}
}
