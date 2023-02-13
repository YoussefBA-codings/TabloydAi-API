import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/services/prisma.service';
import { User, Prisma } from '@prisma/client';
import {
	QueryGetsParams,
	QueryPostParams,
	WhereUniqueParams,
} from '~/@types/d/queryParamsInterfaces.d';

@Injectable()
export class UserService {
	private selectItem: object = {
		id: true,
		userName: true,
		fullName: true,
		email: true,
    role: true,
    conversionToken: true,
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

	async user(params: WhereUniqueParams): Promise<Partial<User> | null> {
		const { where, include, select } = params;
		return this.prisma.user.findUniqueOrThrow({
			where,
			select: this.selectItem,
		});
	}

	async users(params?: QueryGetsParams): Promise<Partial<User>[]> {
		const { skip, take, cursor, where, orderBy, include, select } = params;
		return this.prisma.user.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
			select: this.selectItems,
		});
	}

	async createUser({ data }: QueryPostParams): Promise<Partial<User>> {
		return this.prisma.user.create({ data, select: this.selectItem });
  }
  
  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<Partial<User>> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
      select: this.selectItem
    });
  }

	// async updateUser(
	// 	data: Prisma.UserCreateInput,
	// 	userWhereUniqueInput: Prisma.UserWhereUniqueInput,
	// 	params?: {},
	// ): Promise<Partial<User>> {
	// 	return this.prisma.user.update({
	// 		data,
	// 		where: userWhereUniqueInput,
	// 	});
	// }
}
