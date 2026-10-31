import { generateMetadata } from '@/utils';

// A sign-in hand-off page, not something to show in search results.
export const metadata = generateMetadata({
	title: 'Signing in',
	path: '/auth-callback',
	noIndex: true,
});

export default function AuthCallbackLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
