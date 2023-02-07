import { Controller, Get, Post, Param, Body, Patch } from '@nestjs/common';
import { UserService } from '@/services/user.service';

import { Users } from '@prisma/client';
import { CreateUserDto } from '~/@types/dto/user.dto';

@Controller()
export class UserController {
	constructor(private readonly appService: UserService) {}
	@Get('users')
	async getUsers(): Promise<Partial<Users>[]> {
		return this.appService.users({
			orderBy: {
				userName: 'asc',
			},
		});
	}

	@Post('users')
	async createUser(@Body() data: CreateUserDto): Promise<Partial<Users>> {
		return this.appService.createUser({ data });
	}

	@Get('user/:userName')
	async getUser(@Param('userName') userName: string): Promise<Partial<Users>> {
		return this.appService.user({ where: { userName } });
	}

	// @Patch('user/:userName')
	// async PatchUser(
	// 	@Param('userName') userName: string,
	// 	@Body() data: CreateUserDto,
	// ): Promise<Partial<Users>> {
	// 	return this.appService.updateUser(data, { userName });
	// }
}
