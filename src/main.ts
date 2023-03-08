import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { PrismaService } from '@/services/prisma.service';

async function bootstrap() {
<<<<<<< HEAD
	const app = await NestFactory.create(AppModule, {
	});
=======
	const app = await NestFactory.create(AppModule);
>>>>>>> 4df5aa542bd8faadb682713de4ff596ffc77bcb0
	const prismaService = app.get(PrismaService);
	await prismaService.enableShutdownHooks(app);
	await app.listen(3000);
}
bootstrap();
