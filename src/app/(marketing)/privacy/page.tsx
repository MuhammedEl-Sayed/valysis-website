import { AnimationContainer, MaxWidthWrapper } from '@/components';
import React from 'react';

const Privacy = () => {
	return (
		<MaxWidthWrapper className='max-w-3xl mx-auto px-8 mb-40'>
			<AnimationContainer delay={0.1} className='w-full'>
				<h1 className='text-4xl md:text-6xl font-heading font-bold my-12 text-center w-full'>
					Privacy Policy
				</h1>
				<p className='text-sm mb-2 italic mt-20'>Last updated: April 8, 2025</p>

				<p className='mt-4'>
					<strong>Valysis</strong> (“we,” “our,” or “us”) is committed to
					protecting your privacy. This Privacy Policy explains how your
					personal information is collected, used, and disclosed by Valysis.
				</p>

				<p className='mt-4'>
					This Privacy Policy applies to our mobile application,{' '}
					<strong>Valysis</strong>. By accessing or using our Service, you
					signify that you have read, understood, and agree to the collection,
					storage, use, and disclosure of your information as described here.
				</p>

				<h2 className='text-xl font-medium mt-12'>Definitions</h2>
				<ul className='list-disc ml-8 mt-4 text-muted-foreground'>
					<li>
						<strong>You</strong> means the individual using the Service.
					</li>
					<li>
						<strong>Company</strong> refers to the Valysis app.
					</li>
					<li>
						<strong>Service Provider</strong> means third parties that help us
						operate, analyze, or display the Service.
					</li>
					<li>
						<strong>Personal Data</strong> means data that can identify an
						individual.
					</li>
					<li>
						<strong>Cookies</strong> are small data files stored on your device.
					</li>
					<li>
						<strong>Device</strong> refers to your phone, tablet, or computer.
					</li>
					<li>
						<strong>Usage Data</strong> refers to collected data about how the
						app is used.
					</li>
				</ul>

				<h2 className='text-xl font-medium mt-12'>
					What Information Do We Collect?
				</h2>

				<h3 className='text-lg mt-8'>Personal Data</h3>
				<p className='mt-4 text-muted-foreground'>
					We may ask for limited information such as an email address or account
					details if needed. Primarily, we collect:
				</p>
				<ul className='list-disc ml-8 text-muted-foreground mt-2'>
					<li>Cookies</li>
					<li>Usage Data</li>
					<li>Crash and diagnostic data</li>
				</ul>

				<h3 className='text-lg mt-8'>Usage Data</h3>
				<p className='mt-4 text-muted-foreground'>
					This includes information such as your device’s IP address, device
					type, operating system version, time spent in-app, and interaction
					events that help us understand how you use Valysis.
				</p>

				<h3 className='text-lg mt-8'>Crash & Diagnostic Data</h3>
				<p className='mt-4 text-muted-foreground'>
					When the app encounters an error or crash, diagnostic information (for
					example, stack traces, device type, OS version, and app version) is
					sent to our analytics partners, including Firebase Crashlytics and
					LogRocket. This information is used only to diagnose and fix
					technical issues and does not include information such as your name or
					email address.
				</p>

				<h3 className='text-lg mt-8'>Cookies & Tracking</h3>
				<p className='mt-4 text-muted-foreground'>
					We use cookies and similar technologies to operate, analyze, and
					personalize the Service. You can disable cookies in your browser
					settings, but some features may stop working properly.
				</p>

				<h2 className='text-xl font-medium mt-12'>
					How We Use Your Information
				</h2>
				<p className='mt-4 text-muted-foreground'>We use collected data to:</p>
				<ul className='list-disc ml-8 text-muted-foreground mt-2'>
					<li>Provide and maintain Valysis</li>
					<li>Display ads and measure their effectiveness</li>
					<li>Improve user experience and app performance</li>
					<li>Understand and analyze usage trends</li>
					<li>Respond to user support requests</li>
				</ul>

				<h2 className='text-xl font-medium mt-12'>Advertising & Tracking</h2>
				<p className='mt-4 text-muted-foreground'>
					Valysis may display ads provided by Google Mobile Ads (AdMob). These
					ads may use cookies and device identifiers (such as IDFA on iOS) to
					show personalized or contextual ads and to measure ad performance. You
					can opt out of personalized ads in your device settings (for example,
					“Limit Ad Tracking” on iOS). We comply with Apple’s App Tracking
					Transparency (ATT) framework and will ask for your consent where
					required.
				</p>

				<h2 className='text-xl font-medium mt-12'>
					Third-Party Services We Use
				</h2>
				<p className='mt-4 text-muted-foreground'>
					We rely on trusted third-party partners to operate and analyze
					Valysis. These partners may collect or receive data as described
					below:
				</p>
				<ul className='list-disc ml-8 text-muted-foreground mt-2'>
					<li>
						<strong>Google Mobile Ads (AdMob)</strong> — displays advertisements
						and may collect device identifiers and interaction data to deliver
						and measure ads. Learn more:{' '}
						<a
							href='https://policies.google.com/privacy'
							className='underline'
							target='_blank'
							rel='noreferrer'
						>
							policies.google.com/privacy
						</a>
						.
					</li>
					<li>
						<strong>Firebase Analytics & Crashlytics</strong> — collects
						aggregated app usage, performance metrics, and crash data to help us
						improve stability and usability. Learn more:{' '}
						<a
							href='https://firebase.google.com/support/privacy'
							className='underline'
							target='_blank'
							rel='noreferrer'
						>
							firebase.google.com/support/privacy
						</a>
						.
					</li>
					<li>
						<strong>LogRocket</strong> — records anonymous session replays,
						console logs, and crash traces to help us debug and improve the
						Service. Learn more:{' '}
						<a
							href='https://logrocket.com/privacy/'
							className='underline'
							target='_blank'
							rel='noreferrer'
						>
							logrocket.com/privacy
						</a>
						.
					</li>
				</ul>

				<h2 className='text-xl font-medium mt-12'>Data Retention</h2>
				<p className='mt-4 text-muted-foreground'>
					We retain your data only as long as necessary to provide our services
					and for the purposes outlined in this policy. We delete or anonymize
					it once it is no longer needed unless we are legally required to
					retain it.
				</p>

				<h2 className='text-xl font-medium mt-12'>Data Security</h2>
				<p className='mt-4 text-muted-foreground'>
					We use industry-standard methods such as encryption (SSL/TLS) and
					secure storage to protect your data. However, no system is perfectly
					secure, and we cannot guarantee absolute protection.
				</p>

				<h2 className='text-xl font-medium mt-12'>Your Rights</h2>
				<h3 className='text-lg mt-8'>EEA Users (GDPR)</h3>
				<ul className='list-disc ml-8 text-muted-foreground mt-2'>
					<li>Right to access, update, or delete your information</li>
					<li>Right to object to or restrict processing</li>
					<li>Right to data portability</li>
					<li>Right to withdraw consent at any time</li>
				</ul>

				<h3 className='text-lg mt-8'>California Residents (CCPA)</h3>
				<ul className='list-disc ml-8 text-muted-foreground mt-2'>
					<li>Right to know what personal data we collect</li>
					<li>Right to access or delete personal data</li>
					<li>Right to non-discrimination for exercising these rights</li>
					<li>
						Right to opt-out of data selling (we do not sell your personal
						data)
					</li>
				</ul>

				<h2 className='text-xl font-medium mt-12'>Children’s Privacy</h2>
				<p className='mt-4 text-muted-foreground'>
					Valysis is not intended for children under 13. We do not knowingly
					collect personal data from minors. If we discover such data was
					collected, we will delete it promptly.
				</p>

				<h2 className='text-xl font-medium mt-12'>Third-Party Links</h2>
				<p className='mt-4 text-muted-foreground'>
					Valysis may contain links to third-party content or services. We are
					not responsible for the privacy practices or content of those
					websites. We encourage you to review their respective privacy
					policies.
				</p>

				<h2 className='text-xl font-medium mt-12'>Changes to This Policy</h2>
				<p className='mt-4 text-muted-foreground'>
					We may update this Privacy Policy occasionally. When we do, we’ll
					update the “Last updated” date above and may notify you in-app or via
					email if the changes are significant.
				</p>

				<h2 className='text-xl font-medium mt-12'>Contact Us</h2>
				<p className='mt-4 text-muted-foreground'>
					If you have questions or concerns about this Privacy Policy or our
					data practices, please contact us:
				</p>
				<ul className='list-none ml-0 mt-2 text-muted-foreground'>
					<li>
						<strong>Email:</strong> muhammed.s.elsayed@gmail.com
					</li>
					<li>
						<strong>Location:</strong> New Jersey, USA
					</li>
				</ul>

				<p className='mt-8 font-medium'>
					By using Valysis, you agree to this Privacy Policy.
				</p>
			</AnimationContainer>
		</MaxWidthWrapper>
	);
};

export default Privacy;
