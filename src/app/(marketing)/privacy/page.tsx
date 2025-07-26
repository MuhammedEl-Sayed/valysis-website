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
					<strong>Valysis</strong> (&quot;we,&quot; &quot;our,&quot; or
					&quot;s&quot;) is committed to protecting your privacy. This Privacy
					Policy explains how your personal information is collected, used, and
					disclosed by Valysis.
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
						operate or analyze the Service.
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
					We may ask for information like email addresses or account details if
					needed. We primarily collect:
				</p>
				<ul className='list-disc ml-8 text-muted-foreground mt-2'>
					<li>Cookies</li>
					<li>Usage Data</li>
				</ul>

				<h3 className='text-lg mt-8'>Usage Data</h3>
				<p className='mt-4 text-muted-foreground'>
					This includes your device’s IP address, browser type, device type, OS
					version, time spent in-app, crash logs, and other diagnostic data.
				</p>

				<h3 className='text-lg mt-8'>Cookies & Tracking</h3>
				<p className='mt-4 text-muted-foreground'>
					We use cookies to operate and personalize the Service. You can disable
					cookies in your browser settings, but some features may stop working
					properly.
				</p>

				<h2 className='text-xl font-medium mt-12'>
					How We Use Your Information
				</h2>
				<p className='mt-4 text-muted-foreground'>We use collected data to:</p>
				<ul className='list-disc ml-8 text-muted-foreground mt-2'>
					<li>Provide and maintain Valysis</li>
					<li>Improve user experience</li>
					<li>Understand and analyze usage</li>
					<li>Respond to user support requests</li>
				</ul>

				<h2 className='text-xl font-medium mt-12'>Data Retention</h2>
				<p className='mt-4 text-muted-foreground'>
					We retain your data only as long as needed to provide our services and
					for the purposes outlined in this policy. We delete or anonymize it
					once no longer necessary unless we are legally required to retain it.
				</p>

				<h2 className='text-xl font-medium mt-12'>Data Security</h2>
				<p className='mt-4 text-muted-foreground'>
					We use industry-standard methods like encryption and SSL to protect
					your data. However, no system is perfectly secure.
				</p>

				<h2 className='text-xl font-medium mt-12'>Your Rights</h2>
				<h3 className='text-lg mt-8'>EEA Users (GDPR)</h3>
				<ul className='list-disc ml-8 text-muted-foreground mt-2'>
					<li>Right to access, update, or delete your info</li>
					<li>Right to object or restrict processing</li>
					<li>Right to data portability</li>
					<li>Right to withdraw consent</li>
				</ul>

				<h3 className='text-lg mt-8'>California Residents (CCPA)</h3>
				<ul className='list-disc ml-8 text-muted-foreground mt-2'>
					<li>Right to know what we collect</li>
					<li>Right to access or delete personal data</li>
					<li>Right to non-discrimination</li>
					<li>
						Right to opt-out of data selling (note: we don’t sell your data)
					</li>
				</ul>

				<h2 className='text-xl font-medium mt-12'>Children’s Privacy</h2>
				<p className='mt-4 text-muted-foreground'>
					Valysis is not intended for children under 13. We do not knowingly
					collect data from minors. If we discover such data was collected, we
					will delete it promptly.
				</p>

				<h2 className='text-xl font-medium mt-12'>Changes to This Policy</h2>
				<p className='mt-4 text-muted-foreground'>
					We may update this policy occasionally. When we do, we’ll update the
					“Last updated” date and may notify you in-app or via email if the
					changes are significant.
				</p>

				<h2 className='text-xl font-medium mt-12'>
					Third-Party Links & Services
				</h2>
				<p className='mt-4 text-muted-foreground'>
					Our app may link to third-party content or use third-party services.
					Their privacy practices are their own. We encourage reviewing their
					policies.
				</p>

				<h2 className='text-xl font-medium mt-12'>Contact Us</h2>
				<p className='mt-4 text-muted-foreground'>
					Have questions or need help? Reach out:
				</p>
				<ul className='list-none ml-0 mt-2 text-muted-foreground'>
					<li>
						<strong>Email:</strong> contact@valysis.com
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
