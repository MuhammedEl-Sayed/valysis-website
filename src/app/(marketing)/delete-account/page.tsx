import { AnimationContainer, MaxWidthWrapper } from '@/components';
import { generateMetadata } from '@/utils';
import React from 'react';

export const metadata = generateMetadata({
	title: 'Delete your data',
	description: 'How to delete your Valysis account and data.',
	path: '/delete-account',
});

const supportEmail = 'muhammed.s.elsayed@gmail.com';
const mailto = `mailto:${supportEmail}?subject=${encodeURIComponent(
	'Delete my Valysis data'
)}&body=${encodeURIComponent(
	'Riot ID (name#tag):\nRegion (NA, EU, AP, KR, BR or LATAM):\n'
)}`;

// Linked from the Play Console data safety form, which requires a web page
// where people can ask for their account and data to be deleted.
const DeleteAccount = () => {
	return (
		<MaxWidthWrapper className='max-w-3xl mx-auto px-8 mb-40'>
			<AnimationContainer delay={0.1} className='w-full'>
				<h1 className='text-4xl md:text-6xl font-heading font-bold my-12 text-center w-full'>
					Delete your data
				</h1>

				<p className='mt-20'>
					You can delete your <strong>Valysis</strong> account and the data
					tied to it at any time. Deleting it doesn&apos;t affect your Riot
					account.
				</p>

				<h2 className='text-xl font-medium mt-12'>In the app</h2>
				<p className='mt-4 text-muted-foreground'>
					Open Valysis, go to <strong>Settings</strong> and tap{' '}
					<strong>Remove account data</strong>. This deletes your account from
					our servers and clears your match history and settings from the
					device straight away.
				</p>

				<h2 className='text-xl font-medium mt-12'>On the web</h2>
				<p className='mt-4 text-muted-foreground'>
					Sign in with Riot so we know the account is yours, and we&apos;ll
					delete it straight away.
				</p>
				<a
					href='/api/auth/delete-account/start'
					className='inline-block mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity'
				>
					Sign in with Riot and delete
				</a>
				<p className='mt-4 text-sm text-muted-foreground'>
					Can&apos;t sign in?{' '}
					<a href={mailto} className='underline'>
						Email a deletion request
					</a>{' '}
					to <strong>{supportEmail}</strong> with your Riot ID and region.
					We&apos;ll delete your account within 30 days and reply to confirm.
				</p>

				<h2 className='text-xl font-medium mt-12'>What gets deleted</h2>
				<ul className='list-disc ml-8 mt-4 text-muted-foreground'>
					<li>Your Riot ID (name and tag) and region</li>
					<li>Your Riot account ID (PUUID)</li>
					<li>Your sign-in consent record</li>
					<li>
						Match history and settings stored on your device (removed by the
						in-app option, or by uninstalling the app)
					</li>
				</ul>

				<h2 className='text-xl font-medium mt-12'>What we keep</h2>
				<p className='mt-4 text-muted-foreground'>
					Nothing tied to your account. Crash reports, usage analytics and ad
					data are collected by Google (Firebase and AdMob) without your Riot
					ID, so they can&apos;t be traced back to your account. Google keeps
					them under its own retention periods, described in the{' '}
					<a href='/privacy' className='underline'>
						Privacy Policy
					</a>
					.
				</p>
			</AnimationContainer>
		</MaxWidthWrapper>
	);
};

export default DeleteAccount;
