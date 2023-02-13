import { Controller, Post, Param, Req, Delete } from '@nestjs/common';
import { UserService } from '@/services/user.service';
import { User } from '@prisma/client';
import { Request } from 'express';


@Controller('/api')
export class ConversionTokenController {
  constructor(private readonly appService: UserService) {  }
	
  @Post('/user/token/:nbToken')
  async addConversionToken(@Req() req: Request, @Param('nbToken') nbToken: number): Promise<Partial<User>> {
    const newTokenNumber: number = Number(req.user.conversionToken) + Number(nbToken);
    const user = await this.appService.user({ where: {id: req.user.id} });
    return this.appService.updateUser({
      where: { id: user.id },
      data: { conversionToken: newTokenNumber}
    }) 
	}

  @Delete('/user/token/:nbToken')
  async removeConversionToken(@Req() req: Request, @Param('nbToken') nbToken: number): Promise<Partial<User>> {
    const newTokenNumber: number = Number(req.user.conversionToken) - Number(nbToken);
    const user = await this.appService.user({ where: {id: req.user.id} });
    return this.appService.updateUser({
      where: { id: user.id },
      data: { conversionToken: newTokenNumber}
    }) 
	}


}
