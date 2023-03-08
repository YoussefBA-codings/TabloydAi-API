import { Controller, Post, Param, Req, Delete } from '@nestjs/common';
import { UserService } from '@/services/user.service';
import { User, Prisma } from '@prisma/client';
import { Request } from 'express';

@Controller('/api')
export class ConversionTokenController {
  constructor(private readonly appService: UserService) {}

  @Post('/user/token/:nbToken')
  async addConversionToken(
    @Req() req: Request,
    @Param('nbToken') nbToken: number
  ): Promise<Partial<User>> {
    const newTokenNumber: number =
      Number(req.user.conversionToken) + Number(nbToken);
    return this.appService.updateUser(
      { conversionToken: newTokenNumber } as Prisma.UserUpdateInput,
      { id: req.user.id }
    );
  }

  @Delete('/user/token/:nbToken')
  async removeConversionToken(
    @Req() req: Request,
    @Param('nbToken') nbToken: number
  ): Promise<Partial<User>> {
    const newTokenNumber: number =
      Number(req.user.conversionToken) - Number(nbToken);
    return this.appService.updateUser(
      { conversionToken: newTokenNumber } as Prisma.UserUpdateInput,
      { id: req.user.id }
    );
  }
}
