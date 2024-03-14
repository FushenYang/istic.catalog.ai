import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare';
import * as React from 'react';
import {
	Link,
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
		description: 'AI行业与科研信息',
	});
}

export default function App() {
	const { repo, owner, description } = useLoaderData<typeof loader>();
	return (
		<Document>
			<Layout
				title={repo}
				description={description}
				actionText="GitHub Repository"
				actionLink={`https://github.com/${owner}/${repo}`}
			>
				<Outlet />
			</Layout>
		</Document>
	);
}

function Document({
	children,
	title,
}: {
	children: React.ReactNode;
	title?: string;
}) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				{title ? <title>{title}</title> : null}
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

function Layout({
	children,
	title,
	description,
	actionText,
	actionLink,
}: {
	children?: React.ReactNode;
	title?: string;
	description?: string;
	actionText?: string;
	actionLink?: string;
}) {
	return (
		<div className="container mx-auto">
			<div className="flex flex-col-reverse lg:flex-row">
				<section
					className={`relative flex-1 ${children ? 'border-t lg:border-t-0' : ''}`.trim()}
				>
					<div className="sticky top-0">
						<div
							className={`flex flex-col px-5 py-5 lg:px-10 lg:py-10 ${children ? 'lg:min-h-screen' : 'min-h-screen'}`.trim()}
						>
							<header className="py-4">
								<Link to="/" title="首页">
									首页
								</Link>
							</header>
							<div className="flex-1 py-10 lg:py-20">
								<h2 className="text-xl">{title}</h2>
								<p className="py-2">{description}</p>
								{actionText ? (
									<a
										className="mt-2 inline-block border px-4 py-2 hover:border-black"
										href={actionLink ?? '#'}
									>
										{actionText}
									</a>
								) : null}
							</div>
							<footer className="pt-8">
								本网站基于remix框架设计,更多资料请参考{' '}
								<a className="underline" href="https://remix.guide">
									Remix手册
								</a>
							</footer>
						</div>
					</div>
				</section>
				{children ? (
					<main className="flex-1">
						<div className="px-5 py-5 lg:py-10">{children}</div>
					</main>
				) : null}
			</div>
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
			<Document title={title}>
				<Layout title={title} description={message} />
			</Document>
		);
	}

	return (
		<Document title="Error!">
			<Layout title="There was an error" description={`${error}`} />
		</Document>
	);
}
