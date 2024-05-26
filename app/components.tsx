import * as React from 'react';
import markdoc, { type RenderableTreeNodes } from '@markdoc/markdoc';
import type { ProgramMetadata } from '~/types';
import Icon from '@mdi/react';
import { mdiMapMarker, mdiAccountSupervisor, mdiWallet } from '@mdi/js';
import { useState } from 'react';

export function RemixLogo(props: React.ComponentPropsWithoutRef<'svg'>) {
	return (
		<svg
			viewBox="0 0 659 165"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			aria-labelledby="remix-run-logo-title"
			role="img"
			width="106"
			height="30"
			fill="currentColor"
			{...props}
		>
			<title id="remix-run-logo-title">Remix Logo</title>
			<path d="M0 161V136H45.5416C53.1486 136 54.8003 141.638 54.8003 145V161H0Z M133.85 124.16C135.3 142.762 135.3 151.482 135.3 161H92.2283C92.2283 158.927 92.2653 157.03 92.3028 155.107C92.4195 149.128 92.5411 142.894 91.5717 130.304C90.2905 111.872 82.3473 107.776 67.7419 107.776H54.8021H0V74.24H69.7918C88.2407 74.24 97.4651 68.632 97.4651 53.784C97.4651 40.728 88.2407 32.816 69.7918 32.816H0V0H77.4788C119.245 0 140 19.712 140 51.2C140 74.752 125.395 90.112 105.665 92.672C122.32 96 132.057 105.472 133.85 124.16Z" />
			<path d="M229.43 120.576C225.59 129.536 218.422 133.376 207.158 133.376C194.614 133.376 184.374 126.72 183.35 112.64H263.478V101.12C263.478 70.1437 243.254 44.0317 205.11 44.0317C169.526 44.0317 142.902 69.8877 142.902 105.984C142.902 142.336 169.014 164.352 205.622 164.352C235.83 164.352 256.822 149.76 262.71 123.648L229.43 120.576ZM183.862 92.6717C185.398 81.9197 191.286 73.7277 204.598 73.7277C216.886 73.7277 223.542 82.4317 224.054 92.6717H183.862Z" />
			<path d="M385.256 66.5597C380.392 53.2477 369.896 44.0317 349.672 44.0317C332.52 44.0317 320.232 51.7117 314.088 64.2557V47.1037H272.616V161.28H314.088V105.216C314.088 88.0638 318.952 76.7997 332.52 76.7997C345.064 76.7997 348.136 84.9917 348.136 100.608V161.28H389.608V105.216C389.608 88.0638 394.216 76.7997 408.04 76.7997C420.584 76.7997 423.4 84.9917 423.4 100.608V161.28H464.872V89.5997C464.872 65.7917 455.656 44.0317 424.168 44.0317C404.968 44.0317 391.4 53.7597 385.256 66.5597Z" />
			<path d="M478.436 47.104V161.28H519.908V47.104H478.436ZM478.18 36.352H520.164V0H478.18V36.352Z" />
			<path d="M654.54 47.1035H611.788L592.332 74.2395L573.388 47.1035H527.564L568.78 103.168L523.98 161.28H566.732L589.516 130.304L612.3 161.28H658.124L613.068 101.376L654.54 47.1035Z" />
		</svg>
	);
}

export function Markdown({ content }: { content: RenderableTreeNodes }) {
	return <div className="prose">{markdoc.renderers.react(content, React)}</div>;
}

export function ProgramCard({ program }: { program: ProgramMetadata }) {
	const [expanded, setExpanded] = useState(false);

	const expandBtnHandle = () => {
		setExpanded(!expanded);
	};
	return expanded
		? ExpandedProgramCard({ program, expandBtnHandle })
		: NonExpandedProgramCard({ program, expandBtnHandle });
}

function NonExpandedProgramCard({
	program,
	expandBtnHandle,
}: {
	program: ProgramMetadata;
	expandBtnHandle: () => void;
}) {
	return (
		<div className="group mx-auto overflow-hidden rounded-xl bg-white shadow-md hover:bg-slate-100">
			<div className="group/main p-8">
				<div className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
					{program.prog_type}
				</div>
				<a
					href={program.course_url}
					className="mt-1 block text-lg font-medium leading-tight hover:underline"
				>
					{program.prog_name}
				</a>

				<p className="mt-2 line-clamp-3 text-slate-500">{program.prog_goal}</p>
				<div className="flex flex-wrap space-x-2 text-sm text-gray-500">
					<div className="flex items-center space-x-1">
						<Icon path={mdiMapMarker} size={0.7} />
						<p>{program.country}</p>
						<span className="w-0" />
						<p>{program.inst_name_cn}</p>
					</div>
					<div className="flex items-center space-x-1">
						<Icon path={mdiAccountSupervisor} size={0.7} />
						<a href={program.faculty}>点击查看</a>
					</div>
					<div className="flex items-center space-x-1">
						<Icon path={mdiWallet} size={0.7} />
						<p>{program.duration}</p>
					</div>

					<span className="grow" />
					<button
						className="m-2 inline-block border px-4 py-2 hover:border-black"
						onClick={expandBtnHandle}
					>
						展开
					</button>
				</div>
			</div>
		</div>
	);
}

function ExpandedProgramCard({
	program,
	expandBtnHandle,
}: {
	program: ProgramMetadata;
	expandBtnHandle: () => void;
}) {
	const propsToShow = {
		inst_name_cn: '机构名称',
		inst_name_en: '机构英文名称',
		intro_cn: '机构简介',
		inst_type: '机构类型',
		country: '机构所在国家',
		rank: '项目学科排名',
		prog_name: '项目名称',
		is_indep: '是否独立项目',
		prog_type: '项目类型',
		prog_url: '项目介绍的URL',
		school: '所在学院',
		host_inst: '依托院系',
		awards_or_abet: '项目荣誉或是否有工程认证',
		apply_url: '申请链接',
		degree: '所授学位',
		duration: '学制',
		joint: '是否为贯通项目',
		min_credit: '学分要求',
		thesis: '论文要求',
		prog_goal: '教育目标',
		prog_outcome: '预期学习成果',
		has_culm_act: '是否有最终项目',
		internship: '是否提供实习',
		has_minor: '是否提供选修或双学位',
		course_url: '课程链接',
		faculty: '教职人员',
		stu_hb_url: '学生手册链接',
	};

	return (
		<div className="group mx-auto overflow-hidden rounded-xl bg-white shadow-md hover:bg-slate-100">
			<div className="group/main p-8">
				<div className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
					{program.prog_type}
				</div>
				<a
					href={program.course_url}
					className="mt-1 block text-lg font-medium leading-tight hover:underline"
				>
					{program.prog_name}
				</a>

				<p className="mt-2 text-slate-500">{program.prog_goal}</p>

				<table className="w-full table-auto border-collapse border border-slate-400 bg-white text-sm shadow-sm">
					<tbody>
						{Object.entries(propsToShow).map(entry => (
							<tr key={entry[0]} className="hover:bg-slate-100">
								<td className="border border-slate-300 p-2 text-slate-500">
									{entry[1]}
								</td>
								<td className="border border-slate-300 p-2 text-slate-500">
									{(program as any)[entry[0]]}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className="flex flex-wrap space-x-2 text-sm text-gray-500">
					<span className="grow" />
					<button
						className="m-2 inline-block border px-4 py-2 hover:border-black"
						onClick={expandBtnHandle}
					>
						收缩
					</button>
				</div>
			</div>
		</div>
	);
}
