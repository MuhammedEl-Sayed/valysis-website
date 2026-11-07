import { Metadata } from 'next';

export const SITE_URL = 'https://valysis.com';
const SITE_NAME = 'Valysis';
const DEFAULT_TITLE = 'Valysis: Valorant Stats Tracker for iOS and Android';
const DEFAULT_DESCRIPTION =
	'Valysis is a free Valorant stats tracker for iOS and Android. See every gunfight, round economy, kill and death heatmaps, agent matchups, and KDA, ACS and win rate trends for your matches.';

/**
 * Page metadata. With no `title` this is the site-wide default (used by the
 * root layout); a page's `title` fills the "%s | Valysis" template. `path` sets
 * the canonical URL and Open Graph URL.
 */
export const generateMetadata = ({
	title,
	description = DEFAULT_DESCRIPTION,
	path = '/',
	image = '/thumbnail.png',
	icons = [
		{
			rel: 'apple-touch-icon',
			sizes: '32x32',
			url: '/apple-touch-icon.png',
		},
		{
			rel: 'icon',
			sizes: '32x32',
			url: '/favicon-32x32.png',
		},
		{
			rel: 'icon',
			sizes: '16x16',
			url: '/favicon-16x16.png',
		},
	],
	noIndex = false,
}: {
	title?: string;
	description?: string;
	path?: string;
	image?: string | null;
	icons?: Metadata['icons'];
	noIndex?: boolean;
} = {}): Metadata => {
	const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
	return {
		metadataBase: new URL(SITE_URL),
		title: title ?? { default: DEFAULT_TITLE, template: `%s | ${SITE_NAME}` },
		description,
		applicationName: SITE_NAME,
		keywords: [
			'Valorant stats',
			'Valorant tracker',
			'Valorant match history',
			'Valorant heatmap',
			'Valorant KDA',
			'Valorant app',
		],
		icons,
		alternates: { canonical: path },
		openGraph: {
			type: 'website',
			siteName: SITE_NAME,
			locale: 'en_US',
			url: path,
			title: fullTitle,
			description,
			...(image && { images: [{ url: image, alt: DEFAULT_TITLE }] }),
		},
		twitter: {
			card: 'summary_large_image',
			title: fullTitle,
			description,
			...(image && { images: [image] }),
		},
		...(noIndex && { robots: { index: false, follow: false } }),
	};
};
