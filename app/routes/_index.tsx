/* eslint-disable react-hooks/exhaustive-deps */
import { useLoaderData } from '@remix-run/react';
import _ from 'lodash';
import { useCallback, useState } from 'react';
import { ProgramCard } from '~/components';
import MultiSelect from '~/components/MultiSelect';
import { ProgramMetadata } from '~/types';
import getCSVData from '~/utils/data';
import Papa from 'papaparse';

export const loader = async () => {
	return getCSVData();
};

export default function Index() {
	const data = useLoaderData<{ [key: string]: string }[]>();

	const [filterState, setFilterState] = useState<FilterState>({
		country: [],
		instType: [],
		progType: [],
		duration: [],
	});

	const selectedData = data.filter(
		item =>
			(filterState.country.length === 0 ||
				filterState.country.includes(item['country'])) &&
			(filterState.instType.length === 0 ||
				filterState.instType.includes(item['inst_type'])) &&
			(filterState.progType.length === 0 ||
				filterState.progType.includes(item['prog_type'])) &&
			(filterState.duration.length === 0 ||
				filterState.duration.includes(item['duration'])),
	);

	const readyToSave = new Blob([Papa.unparse(selectedData)]);
	const readyToSaveBOM = new Blob(['\ufeff', Papa.unparse(selectedData)], {});
	const fileUrl = URL.createObjectURL(readyToSave);
	const fileBOMUrl = URL.createObjectURL(readyToSaveBOM);

	return (
		<div className="m-4 space-y-8">
			{/* <HeadCard
				title="AI资源信息库"
				description="本网站汇总整理AI资源信息，如有侵权请联系项目管理员。"
			/> */}
			{/* <p className={`font-bold`}>资源信息{content}</p> */}
			<div className="flex flex-col items-start gap-1">
				<div className="text-3xl font-bold">筛选</div>
				<ItemFilter
					data={data}
					filterState={filterState}
					updateCallback={setFilterState}
				></ItemFilter>
				<div className="flex items-center gap-1">
					<span>符合条件的信息有：{selectedData.length}条</span>
					<a
						className="rounded bg-green-400 p-1 text-white"
						href={fileBOMUrl}
						download={'filtered_bom.csv'}
					>
						下载(UTF-8 BOM，可用于Excel)
					</a>
					<a
						className="rounded bg-sky-400 p-1 text-white"
						href={fileUrl}
						download={'filtered.csv'}
					>
						下载(UTF-8，可用于其他程序)
					</a>
				</div>
				<ItemList data={selectedData}></ItemList>
			</div>
		</div>
	);
}

function ItemList(props: { data: { [key: string]: string }[] }) {
	const { data } = props;
	return (
		<div className="space-y-4 sm:space-y-6 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
			{data.map((item, index) => {
				return <ProgramCard program={new ProgramMetadata(item)} key={index} />;
			})}
		</div>
	);
}

type FilterState = {
	[key in 'country' | 'progType' | 'instType' | 'duration']: string[];
};

function ItemFilter(props: {
	data: { [key: string]: string }[];
	filterState: FilterState;
	updateCallback: (newState: FilterState) => void;
}) {
	const { data, filterState, updateCallback } = props;
	const updateState = useCallback(
		(update: Partial<FilterState>) =>
			updateCallback({ ...filterState, ...update }),
		[filterState, updateCallback],
	);
	return (
		<div className="flex flex-wrap gap-1">
			<MultiSelect
				title="国家"
				selected={filterState.country}
				setSelected={value => updateState({ country: value })}
				availables={_.uniq(data.map(item => item['country']))}
			></MultiSelect>
			<MultiSelect
				title="项目类型"
				selected={filterState.progType}
				setSelected={value => updateState({ progType: value })}
				availables={_.uniq(data.map(item => item['prog_type']))}
			></MultiSelect>
			<MultiSelect
				title="机构类型"
				selected={filterState.instType}
				setSelected={value => updateState({ instType: value })}
				availables={_.uniq(data.map(item => item['inst_type']))}
			></MultiSelect>
			<MultiSelect
				title="学制"
				selected={filterState.duration}
				setSelected={value => updateState({ duration: value })}
				availables={_.uniq(data.map(item => item['duration']))}
			></MultiSelect>
		</div>
	);
}
