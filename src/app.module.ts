import { Module } from '@nestjs/common';
import { AppController } from '@/controllers/app.controller';
import { UserController } from '@/controllers/user.controller';
import { AppService } from '@/services/app.service';
import { UserService } from '@/services/user.service';
import { PrismaService } from './prisma.service';

@Module({
	imports: [],
	controllers: [AppController, UserController],
	providers: [AppService, UserService, PrismaService],
})
export class AppModule {}
