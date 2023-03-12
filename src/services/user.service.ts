import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/services/prisma.service';
import { S3Service } from '@/services/s3.service';
import { User, Prisma } from '@prisma/client';
import {
  QueryGetsParams,
  QueryPostParams,
  WhereUniqueParams
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
    deletedAt: true
  };
  private selectItems: object = {
    id: true,
    userName: true,
    email: true,
    createdAt: true
  };
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3: S3Service
  ) { }

  async user(params: WhereUniqueParams): Promise<Partial<User> | null> {
    const { where, include, select } = params;
    return this.prisma.user.findUniqueOrThrow({
      where,
      select: this.selectItem
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
      select: this.selectItems
    });
  }

  async createUser({ data }: QueryPostParams): Promise<Partial<User>> {
    return this.prisma.user.create({ data, select: this.selectItem });
  }

  async updateUser(
    data: Prisma.UserUpdateInput,
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    params?: {}
  ): Promise<Partial<User>> {
    return this.prisma.user.update({
      data,
      where: userWhereUniqueInput,
      select: this.selectItem
    });
  }

  async desactivateUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    params?: {}
  ): Promise<Partial<User>> {
    return this.prisma.user.update({
      data: {
        isDesactivate: true,
        deletedAt: new Date()
      },
      where: userWhereUniqueInput,
      select: this.selectItem
    });
  }

  async removeUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    params?: {}
  ): Promise<Partial<User>> {
    return this.prisma.user.delete({
      where: userWhereUniqueInput,
      select: this.selectItem
    });
  }
   
  uploadUserExcel(username, file): boolean {
    this.s3.uploadFile(`${username}/${file.originalname}`, file)
    return true;
  }

  downloadUserExcel(path) {
    return this.s3.getFile(path)
  }

  async getUserFileNames(username): Promise<string[]> {
    return await this.s3.getUserFileNames(username)
  }
}
