import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { json, useLoaderData } from '@remix-run/react';

export const loader = async ({ context }: LoaderFunctionArgs) => {
	const db = context.env.DB;
	const { results } = await db.prepare('SELECT * FROM employees').all();
	return json({ content: results.length });
};

export default function Index() {
	const { content } = useLoaderData<typeof loader>();

	return <div>{content}</div>;
}
