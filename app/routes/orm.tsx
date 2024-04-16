import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { json, useLoaderData } from '@remix-run/react';
import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';

export const loader = async ({ context }: LoaderFunctionArgs) => {
	const adapter = new PrismaD1(context.env.DB);
	const db = new PrismaClient({ adapter });
	const count = await db.visit.count();

	// const { results } = await db.prepare('SELECT * FROM employees').all();

	return json({ content: count });
};

export default function Index() {
	const { content } = useLoaderData<typeof loader>();

	return (
		<div>
			<span className={`block`}>测试安装orm</span>
			测试orm:{content}
		</div>
	);
}
