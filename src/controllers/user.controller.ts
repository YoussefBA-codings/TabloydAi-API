import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { UserService } from '@/services/user.service';
import { User as UserModel } from '@prisma/client';
import { CreateUserDto } from '@/dto/user.dto';


@Controller()
export class UserController {
	constructor(private readonly appService: UserService) {}
	
  @Get('users')
	async getUsers(): Promise<UserModel[]> {
    return this.appService.users({
      orderBy: {
        userName: "asc"
      }
    });  
	}

	@Get('user/:id')
	async getUser(@Param('id') id: string): Promise<UserModel> {
    return this.appService.user({id});
  }
  
  @Post('user')
  async createUser(
    @Body() userData: CreateUserDto,
  ): Promise<UserModel> {
    return this.appService.createUser(userData);
  }
}
