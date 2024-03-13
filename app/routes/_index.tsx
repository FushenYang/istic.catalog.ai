import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { json, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { Markdown } from '~/components';

export async function loader({ context }: LoaderFunctionArgs) {
	return json({
		content: 'preview',
	});
}

export default function Index() {
	const { content } = useLoaderData<typeof loader>();
	const [count, setCount] = useState(0);

	return (
		<div>
			<button onClick={() => setCount(count + 1)}>
				Clicked {count} time{count !== 1 ? 's' : ''}
			</button>
			<div>{content}</div>
		</div>
	);
}
