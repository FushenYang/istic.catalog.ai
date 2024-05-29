/* eslint-disable react-hooks/exhaustive-deps */
import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { json, useFetcher, useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import { HeadCard, ProgramCard } from '~/components';
import { ProgramMetadata } from '~/types';
// import { useState } from 'react';
// import { Markdown } from '~/components';

export async function loader({ context }: LoaderFunctionArgs) {
	return json({
		content: '网站内容整理建设中',
	});
}

export default function Index() {
	const { content } = useLoaderData<typeof loader>();
	const fetcher = useFetcher<{ [key: string]: string }[]>({ key: 'category' });
	useEffect(() => {
		fetcher.load('/data');
	}, []);
	const data = fetcher.data;

	return (
		<div className="m-4 space-y-8">
			<HeadCard
				title="AI资源信息库"
				description="本网站汇总整理AI资源信息，如有侵权请联系项目管理员。"
			/>
			<p className={`font-bold`}>资源信息（{content})</p>
			{/* <button onClick={() => setCount(count + 1)}>点击 {count} 次</button> */}
			<div>
				{fetcher.data !== undefined ? (
					<div className="space-y-4 sm:space-y-6 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
						{data?.map((item, index) => {
							return (
								<ProgramCard program={new ProgramMetadata(item)} key={index} />
							);
						})}
					</div>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</div>
	);
}
