'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthCallbackPage = () => {
	const router = useRouter();

	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);

		const code = searchParams.get('code');

		if (code) {
			// Redirect back to your Flutter app with the code
			window.location.href = `valysis://auth?code=${code}`;
		}
	}, []);
	return (
		<div className='flex items-center justify-center flex-col h-screen relative'>
			<div className='border-[3px] border-neutral-800 rounded-full border-b-neutral-200 animate-loading w-8 h-8'></div>
			<p className='text-lg font-medium text-center mt-3'>
				Redirecting you to Valysis...
			</p>
		</div>
	);
};

export default AuthCallbackPage;
