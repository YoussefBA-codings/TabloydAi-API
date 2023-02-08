import { Prisma } from '@prisma/client';

export interface QueryParams {
	include?: Prisma.HasInclude;
	select?: Prisma.HasSelect;
}

export interface WhereUniqueParams extends QueryParams {
	where?: Prisma.UsersWhereUniqueInput;
}
export interface WhereParams extends QueryParams {
	where?: Prisma.UsersWhereInput;
}

export interface QueryGetsParams extends WhereParams {
	skip?: number;
	take?: number;
	cursor?: Prisma.UsersWhereUniqueInput;
	orderBy?: Prisma.UsersOrderByWithRelationInput;
}

export interface QueryGetParams extends WhereUniqueParams {}

export interface QueryPostParams extends QueryParams {
	data: Prisma.UsersCreateInput;
}
