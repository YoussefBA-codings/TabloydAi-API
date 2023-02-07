import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/services/prisma.service';
import { Users, Prisma } from '@prisma/client';
import {
	QueryGetsParams,
	QueryPostParams,
	WhereUniqueParams,
} from '~/@types/d/services';

@Injectable()
export class UserService {
	private selectItem: object = {
		id: true,
		userName: true,
		fullName: true,
		email: true,
		role: true,
		createdAt: true,
		updatedAt: true,
	};
	private selectItems: object = {
		id: true,
		userName: true,
		email: true,
		createdAt: true,
	};
	constructor(private readonly prisma: PrismaService) {}

	async user(params: WhereUniqueParams): Promise<Partial<Users> | null> {
		const { where, include, select } = params;
		return this.prisma.users.findUniqueOrThrow({
			where,
			select: this.selectItem,
		});
	}

	async users(params?: QueryGetsParams): Promise<Partial<Users>[]> {
		const { skip, take, cursor, where, orderBy, include, select } = params;
		return this.prisma.users.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
			select: this.selectItems,
		});
	}

	async createUser({ data }: QueryPostParams): Promise<Partial<Users>> {
		return this.prisma.users.create({ data, select: this.selectItem });
	}

	// async updateUser(
	// 	data: Prisma.UsersCreateInput,
	// 	userWhereUniqueInput: Prisma.UsersWhereUniqueInput,
	// 	params?: {},
	// ): Promise<Partial<Users>> {
	// 	return this.prisma.users.update({
	// 		data,
	// 		where: userWhereUniqueInput,
	// 	});
	// }
}
