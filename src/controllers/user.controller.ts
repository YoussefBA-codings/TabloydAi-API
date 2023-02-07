import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { UserService } from '@/services/user.service';
import { User } from '@prisma/client';
import { CreateUserDto } from '@/dto/user.dto';


@Controller()
export class UserController {
	constructor(private readonly appService: UserService) {}
	
  @Get('users')
	async getUsers(): Promise<Partial<User>[]> {
    return this.appService.users({
      orderBy: {
        userName: "asc"
      }
    });  
	}

	@Get('user/:id')
	async getUser(@Param('id') id: string): Promise<Partial<User>> {
    return this.appService.user({id});
  }
  
  @Post('user')
  async createUser(
    @Body() userData: CreateUserDto,
  ): Promise<Partial<User>> {
    return this.appService.createUser(userData);
  }
}
