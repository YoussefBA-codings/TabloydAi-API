import { QueryParams } from './../../@types/d/queryParamsInterfaces.d';
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
		isDesactivate: true,
		createdAt: true,
		updatedAt: true,
		deletedAt: true,
	};
	private selectItems: object = {
		id: true,
		userName: true,
		email: true,
		createdAt: true,
	};

	private where = (unique) => {
		return {
			OR: [{ id: unique }, { userName: unique }, { email: unique }],
		} as Prisma.UserWhereUniqueInput;

		// return { id: unique } as Prisma.UserWhereUniqueInput;
	};

	constructor(private readonly prisma: PrismaService) {}

	async user(unique, opts?: QueryParams): Promise<Partial<User> | null> {
		const optsReq = {
			where: this.where(unique),
			select: opts && opts.select ? opts.select : this.selectItem,
		};

		return await this.prisma.user.findUniqueOrThrow(optsReq);
	}

	async users(opts?: QueryGetsParams): Promise<Partial<User>[]> {
		const { skip, take, cursor, where, orderBy } = opts;
		return this.prisma.user.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
			select: opts && opts.select ? opts.select : this.selectItems,
		});
	}

	async createUser(data, opts?: QueryParams): Promise<Partial<User>> {
		return this.prisma.user.create({
			data,
			select: opts && opts.select ? opts.select : this.selectItem,
		});
	}

	async updateUser(
		data: Prisma.UserUpdateInput,
		unique,
		opts?: QueryParams,
	): Promise<Partial<User>> {
		return this.prisma.user.update({
			data,
			where: this.where(unique),
			select: opts && opts.select ? opts.select : this.selectItem,
		});
	}

	async desactivateUser(unique, opts?: QueryParams): Promise<Partial<User>> {
		return this.prisma.user.update({
			data: {
				isDesactivate: true,
				deletedAt: new Date(),
			},
			where: this.where(unique),
			select: opts && opts.select ? opts.select : this.selectItem,
		});
	}

	async removeUser(unique, opts?: QueryParams): Promise<Partial<User>> {
		return this.prisma.user.delete({
			where: this.where(unique),
			select: opts && opts.select ? opts.select : this.selectItem,
		});
	}
}
