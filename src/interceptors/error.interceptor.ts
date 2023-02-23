import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
	NotFoundException,
} from '@nestjs/common';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			catchError((error) => {
				if (error && error.code) {
					switch (error.code) {
						case 'P2025':
							throw new NotFoundException(error.message);
						default:
							break;
					}
				}

				throw error;
			}),
		);
	}
}
