import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userDatas = [
	{
		email: 'quentinbekkai@gmail.com',
		fullName: JSON.stringify({
			firstName: 'Quentin',
			lastName: 'BEKKAÏ',
		}),
		userName: 'qbekkai',
		password: bcrypt.hashSync('qbekkai', 10),
		role: 'admin',
	},
	{
		email: 'benamoyoussef@gmail.com',
		fullName: JSON.stringify({
			firstName: 'Youssef',
			lastName: 'BEN AMOR',
		}),
		userName: 'ybenamor',
		password: bcrypt.hashSync('ybenamor', 10),
		role: 'admin',
	},
];

async function main() {
	for (const userData of userDatas) {
		await prisma.users.upsert({
			where: { email: userData.email },
			update: userData,
			create: userData,
		});
	}
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
