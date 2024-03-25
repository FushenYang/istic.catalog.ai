/* eslint-disable react-hooks/exhaustive-deps */
import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { json, useFetcher, useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
// import { useState } from 'react';
// import { Markdown } from '~/components';

export async function loader({ context }: LoaderFunctionArgs) {
	return json({
		content: '网站内容整理建设中',
	});
}

export default function Index() {
	const { content } = useLoaderData<typeof loader>();
	const fetcher = useFetcher<string[][]>({ key: 'category' });
	useEffect(() => {
		fetcher.load('/data');
	}, []);
	// const [count, setCount] = useState(0);

	return (
		<div>
			<p className={`font-bold`}>资源信息（{content})</p>
			{/* <button onClick={() => setCount(count + 1)}>点击 {count} 次</button> */}
			<div className={`flex flex-col lg:flex-row lg:flex-wrap`}>
				{fetcher.data !== undefined ? (
					<div>
						{fetcher.data.map(
							(
								[
									program_name,
									url,
									objective,
									program_type,
									organization_type,
									target_audience,
									cost,
									location,
									participant_level,
									prerequisites,
									is_community_program,
									duration,
								],
								index,
							) => {
								return (
									<div
										key={index}
										className={`m-1 border text-left lg:m-2 lg:basis-[calc(25%-1rem)] lg:bg-cyan-100 lg:pl-2`}
									>
										<table key={index}>
											<thead>
												<tr>
													<th>{index + 1}项目</th>
													<th>信息</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<th className={`whitespace-nowrap`}>项目名称</th>
													<th>{program_name}</th>
												</tr>
												<tr>
													<th>目标</th>
													<th>{objective}</th>
												</tr>
											</tbody>
										</table>
									</div>
								);
							},
						)}
					</div>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</div>
	);
}
