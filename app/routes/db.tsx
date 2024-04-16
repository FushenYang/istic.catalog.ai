import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { json, useLoaderData } from '@remix-run/react';
import { getDb } from '~/services/db';

export const loader = async ({ context }: LoaderFunctionArgs) => {
	const db = getDb(context.env);
	// const { results } = await db.prepare('SELECT * FROM employees').all();
	const results = await db.visit.findMany();
	return json({ content: results });
};

export default function Index() {
	const { content } = useLoaderData<typeof loader>();

	return (
		<div>
			<span className={`block`}>来自数据库的信息</span>
			{content.map((item, index) => {
				return (
					<div key={index}>
						{Object.entries(item).map(([key, value]) => {
							return (
								<div key={key}>
									<strong>{key}:</strong> {String(value)}
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
}
