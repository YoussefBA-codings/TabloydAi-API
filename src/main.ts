import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { PrismaService } from '@/services/prisma.service';
import { ErrorInterceptor } from './interceptors/error.interceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalInterceptors(new ErrorInterceptor());
	const prismaService = app.get(PrismaService);
	await prismaService.enableShutdownHooks(app);
	await app.listen(3000);
}
bootstrap();
