import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { json, useLoaderData } from '@remix-run/react';
// import { useState } from 'react';
// import { Markdown } from '~/components';

export async function loader({ context }: LoaderFunctionArgs) {
	return json({
		content: '网站内容整理建设中',
	});
}

export default function Index() {
	const { content } = useLoaderData<typeof loader>();
	// const [count, setCount] = useState(0);

	return (
		<div>
			<p className={`font-bold`}>资源信息（{content})</p>
			{/* <button onClick={() => setCount(count + 1)}>点击 {count} 次</button> */}
			<div className={`flex flex-col md:flex-wrap`}>
				{[1, 2, 3, 4, 5, 6].map(num => (
					<div
						className={`m-1 border text-left md:m-2 md:basis-[calc(25%-1rem)] md:bg-cyan-100 md:pl-2`}
						key={num}
					>
						<table className={`flex-1 table-auto`}>
							<head>
								<tr>
									<th>{num}项目</th>
									<th>信息</th>
								</tr>
							</head>
							<tbody>
								<tr>
									<th className={`whitespace-nowrap`}>项目名称</th>
									<th>CyberCorps Scholarship for Service Program (SFS)</th>
								</tr>
								<tr>
									<th>目标</th>
									<th>
										Programs of study are varied and cover fields such as
										Computer Science/Engineering, Security of Emerging
										Technologies (e.g., internet of things, medical implants),
										Cyber Law and Privacy, and Policy. ...
									</th>
								</tr>
							</tbody>
						</table>
					</div>
				))}
			</div>
		</div>
	);
}
