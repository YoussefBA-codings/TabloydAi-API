import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from '@/services/login.service';

@Controller('/api')
export class LoginController {
  constructor(private readonly appService: LoginService) {}

  @Post('/login')
  async login(
    @Body('userName') userName: string,
    @Body('password') password: string
  ): Promise<object> {
    return { token: await this.appService.login(userName, password) };
  }

  @Post('/pre-registration')
  async preRegistration(
    @Body('email') email: string,
    @Body('userName') userName: string,
    @Body('password') password: string
  ): Promise<object> {
    return {
      registationToken: await this.appService.preRegistration({
        email,
        userName,
        password
      })
    };
  }

  @Post('/registration')
  async registration(
    @Body('registrationToken') registrationToken: string,
    @Body('verificationCode') verificationCode: string
  ): Promise<boolean> {
    return await this.appService.registration(
      registrationToken,
      verificationCode
    );
  }
}
