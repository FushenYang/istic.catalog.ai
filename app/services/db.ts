import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';

export const getDb = (env: Env) => {
	const adapter = new PrismaD1(env.DB);
	const db = new PrismaClient({ adapter });
	return db;
};
