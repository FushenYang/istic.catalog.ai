import { LoaderFunctionArgs, json } from '@remix-run/cloudflare';
import { parse } from 'csv-parse';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';

export const loader = async ({ context }: LoaderFunctionArgs) => {
	const readStream = createReadStream(
		join(cwd(), 'app', 'db', 'file.csv'),
	).pipe(parse());
	const records: string[][] = [];
	for await (const record of readStream) {
		records.push(record);
	}
	return json(records);
};
