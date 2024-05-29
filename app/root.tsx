import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare';
import * as React from 'react';
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
	json,
	useLoaderData,
	useRouteError,
} from '@remix-run/react';
import '~/styles.css';
import { HeadCard, HeaderContent } from '~/components';
// import { RemixLogo } from './components';

// We will rollback to loading CSS through links when `.css?url` is supported
// export const links: LinksFunction = () => {
//   return [{ rel: 'stylesheet', href: stylesUrl }];
// };

export const meta: MetaFunction = () => {
	return [
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ title: 'AI资源信息库' },
	];
};

export function loader({ context }: LoaderFunctionArgs) {
	return json({
		repo: context.env.GITHUB_REPO,
		owner: context.env.GITHUB_OWNER,
	});
}

export default function App() {
	return (
		<Document>
			<Layout>
				<Outlet />
			</Layout>
		</Document>
	);
}

function Document({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<Meta />
				<Links />
			</head>
			<Scripts />
			<body className="bg-slate-50 font-sans antialiased">
				{children}
				<ScrollRestoration />
			</body>
		</html>
	);
}

function Layout({ children }: { children?: React.ReactNode }) {
	// const { repo, owner } = useLoaderData<typeof loader>();
	const { repo, owner } = { repo: '', owner: '' };
	return (
		<div className="flex flex-col items-center">
			<header className="w-full">
				<HeaderContent repo={repo} owner={owner} />
			</header>
			{children ? <main className="container">{children}</main> : null}
			<footer className=""></footer>
		</div>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();

	// Log the error to the console
	console.error(error);

	if (isRouteErrorResponse(error)) {
		const title = `${error.status} ${error.statusText}`;

		let message;
		switch (error.status) {
			case 401:
				message =
					'Oops! Looks like you tried to visit a page that you do not have access to.';
				break;
			case 404:
				message =
					'Oops! Looks like you tried to visit a page that does not exist.';
				break;
			default:
				message = JSON.stringify(error.data, null, 2);
				break;
		}

		return (
			<Document>
				<Layout>
					<HeadCard title={title} description={message} />
				</Layout>
			</Document>
		);
	}

	return (
		<Document>
			<Layout>
				<HeadCard title="There was an error" description={`${error}`} />
			</Layout>
		</Document>
	);
}
