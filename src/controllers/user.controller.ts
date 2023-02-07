import { Controller, Get, Post, Param, Body, Patch } from '@nestjs/common';
import { UserService } from '@/services/user.service';

import { User } from '@prisma/client';
import { CreateUserDto } from '~/@types/dto/user.dto';

@Controller('/secure/')
export class UserController {
	constructor(private readonly appService: UserService) {}
	@Get('users')
	async getUsers(): Promise<Partial<User>[]> {
		return this.appService.users({
			orderBy: {
				userName: 'asc',
			},
		});
	}

	@Post('users')
	async createUser(@Body() data: CreateUserDto): Promise<Partial<User>> {
		return this.appService.createUser({ data });
	}

	@Get('user/:userName')
	async getUser(@Param('userName') userName: string): Promise<Partial<User>> {
		return this.appService.user({ where: { userName } });
	}

	// @Patch('user/:userName')
	// async PatchUser(
	// 	@Param('userName') userName: string,
	// 	@Body() data: CreateUserDto,
	// ): Promise<Partial<User>> {
	// 	return this.appService.updateUser(data, { userName });
	// }
}
