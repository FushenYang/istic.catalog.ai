import _ from 'lodash';
import { useState } from 'react';

export default function MultiSelect(props: {
	title: string;
	selected: string[];
	setSelected: (value: string[]) => void;
	availables: string[];
}) {
	const { title, selected, setSelected, availables } = props;
	const [showList, setShowList] = useState(false);
	const [search, setSearch] = useState('');
	const select = (value: string) => setSelected(_.uniq([...selected, value]));
	const deselect = (value: string) =>
		setSelected(selected.filter(item => item !== value));
	return (
		<div className="m-1 flex items-center gap-1 rounded-lg bg-zinc-300 p-2">
			<div>{title}</div>
			<div className="flex gap-1">
				{selected.map(item => (
					<div
						className="flex items-center rounded-full border-2 border-green-400  bg-green-200 px-2"
						key={item}
					>
						<span>{item}</span>
						<button onClick={() => deselect(item)}>❌</button>
					</div>
				))}
			</div>
			<div>
				<input
					className="max-w-fit rounded p-1"
					type="text"
					value={search}
					onChange={e => setSearch(e.target.value)}
					onFocus={() => setShowList(true)}
					onClick={() => setShowList(true)}
					placeholder={`输入关键词进行筛选${title}`}
				></input>
				<div className="relative">
					{showList ? (
						<div
							className="absolute top-1 z-10 flex w-full flex-col rounded bg-white p-1"
							onMouseLeave={() => setShowList(false)}
						>
							{_.uniq(availables)
								.filter(item => !selected.includes(item))
								.filter(item => item.includes(search))
								.map(item => (
									<button
										className="w-full rounded p-1 hover:bg-zinc-100"
										onClick={() => {
											select(item);
											setSearch('');
											setShowList(false);
										}}
										key={item}
									>
										{item}
									</button>
								))}
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}
