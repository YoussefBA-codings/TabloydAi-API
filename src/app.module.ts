import { Module } from '@nestjs/common';

// Import Controllers
import { UserController } from '@/controllers/user.controller';

// Import Services
import { UserService } from '@/services/user.service';
import { PrismaService } from '@/services/prisma.service';

@Module({
	imports: [],
	controllers: [UserController],
	providers: [UserService, PrismaService],
})
export class AppModule {}
