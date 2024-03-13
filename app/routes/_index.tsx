import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { json, useLoaderData } from '@remix-run/react';
import { Markdown } from '~/components';

export async function loader({ context }: LoaderFunctionArgs) {
	return json({
		content: 'preview',
	});
}

export default function Index() {
	const { content } = useLoaderData<typeof loader>();

	return <div>{content}</div>;
}
