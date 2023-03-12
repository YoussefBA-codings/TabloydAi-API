import { FileInterceptor } from '@nestjs/platform-express';
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
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  Res,
  UseInterceptors
} from '@nestjs/common';
import { UserService } from '@/services/user.service';
import { User } from '@prisma/client';
import { CreateUserDto } from '~/@types/dto/user.dto';
import { Request } from 'express';

@Controller('/api')
export class UserController {
  constructor(
    private readonly appService: UserService
  ) { }

  @Get('/users')
  async getUsers(): Promise<Partial<User>[]> {
    return this.appService.users({
      orderBy: {
        userName: 'asc'
      }
    });
  }

  @Post('/users')
  async createUser(@Body() data: CreateUserDto): Promise<Partial<User>> {
    return this.appService.createUser({ data });
  }

  @Get('/user/:userName')
  async getUser(@Param('userName') userName: string): Promise<Partial<User>> {
    return this.appService.user({ where: { userName } });
  }

  @Patch('user/:userName')
  async patchUser(
    @Param('userName') userName: string,
    @Body() data: CreateUserDto
  ): Promise<Partial<User>> {
    return this.appService.updateUser(data, { userName });
  }

  @Delete('user/:userName')
  async desactivateUser(
    @Param('userName') userName: string,
    @Query('force') force?: boolean
  ): Promise<Partial<User>> {
    if (force) return this.appService.removeUser({ userName });
    return this.appService.desactivateUser({ userName });
  }

  @Post('user/saveExcel')
  @UseInterceptors(FileInterceptor('file'))
  async saveUserExcel(
    @Req() req: Request,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new FileTypeValidator({ fileType: '.xlsx' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 })
        ]
      })
    )
    file: Express.Multer.File,
    // @Res({ passthrough: true }) res: Response
  ) {
    const resultFile = await this.appService.uploadUserExcel( req.user.userName, file);
    
  }

  @Get('/user/find/fileNames')
  async getUserFileNames(
    @Req() req: Request,
  ) {
    return this.appService.getUserFileNames(req.user.userName)
  }

  @Get('/user/download/file')
  async downloadUserFile(
    @Query('path') path: string
  ) {
    return this.appService.downloadUserExcel(path)
  }
}
