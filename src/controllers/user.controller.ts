import {
	Controller,
	Get,
	Post,
	Patch,
	Delete,
	Param,
	Body,
	Req,
	Query,
} from '@nestjs/common';
import { UserService } from '@/services/user.service';
import { User } from '@prisma/client';
import { CreateUserDto } from '~/@types/dto/user.dto';

@Controller('/api')
export class UserController {
	constructor(private readonly appService: UserService) {}

	@Get('/users')
	async getUsers(): Promise<Partial<User>[]> {
		return this.appService.users({
			orderBy: {
				userName: 'asc',
			},
		});
	}

	@Post('/users')
	async createUser(@Body() data: CreateUserDto): Promise<Partial<User>> {
		return this.appService.createUser({ data });
	}

	@Get('/user/:userName')
	async getUser(@Param('userName') userName: string): Promise<Partial<User>> {
		return this.appService.user(userName);
	}

	@Patch('user/:userName')
	async patchUser(
		@Param('userName') userName: string,
		@Body() data: CreateUserDto,
	): Promise<Partial<User>> {
		return this.appService.updateUser(data, { userName });
	}

	@Delete('user/:userName')
	async desactivateUser(
		@Param('userName') userName: string,
		@Query('force') force?: boolean,
	): Promise<Partial<User>> {
		if (force) return this.appService.removeUser({ userName });
		return this.appService.desactivateUser({ userName });
	}
}
