import { AnimationContainer, MaxWidthWrapper } from '@/components';
import Link from 'next/link';

const TermsPage = () => {
	return (
		<MaxWidthWrapper className='max-w-3xl mx-auto px-8 mb-40'>
			<AnimationContainer delay={0.1} className='w-full'>
				<h1 className='text-4xl md:text-6xl font-heading font-bold my-12 text-center w-full'>
					Terms of Service
				</h1>
				<p className='text-sm mb-2 italic mt-20'>Last updated: April 8, 2025</p>
				<p className='mt-4'>
					Welcome to Valysis. These terms and conditions outline the rules and
					regulations for the use of Valysis&apos;s website, mobile application,
					and services.
				</p>

				<h2 className='text-xl font-medium mt-8'>Acceptance of Terms</h2>
				<p className='mt-8 text-muted-foreground'>
					By accessing and using Valysis, you accept and agree to be bound by
					these terms and conditions. If you do not agree to these terms, you
					may not use our website or services.
				</p>

				<h2 className='text-xl font-medium mt-12'>Changes to Terms</h2>
				<p className='mt-8 text-muted-foreground'>
					Valysis reserves the right to modify these terms at any time. We will
					notify you of any changes by updating the &quot;Last updated&quot;
					date at the top of this page. Your continued use of our website and
					services after any modifications indicates your acceptance of the new
					terms.
				</p>

				<h2 className='text-xl font-medium mt-12'>Use of Services</h2>

				<h3 className='text-lg mt-8'>Eligibility</h3>
				<p className='mt-8'>
					To use Valysis, you must be at least 18 years old and capable of
					entering into a binding contract.
				</p>

				<h3 className='text-lg mt-8'>Account Registration</h3>
				<div className='mt-8'>
					<ul className='list-disc ml-8 text-muted-foreground'>
						<li>
							You must provide accurate and complete information during the
							registration process.
						</li>
						<li>
							You are responsible for maintaining the confidentiality of your
							account information and for all activities that occur under your
							account.
						</li>
						<li>
							You agree to notify us immediately of any unauthorized use of your
							account.
						</li>
					</ul>
				</div>

				<h3 className='text-lg mt-8'>Acceptable Use</h3>
				<div className='mt-8'>
					You agree not to use Valysis for any unlawful or prohibited
					activities, including but not limited to:
					<ul className='list-disc text-muted-foreground ml-8'>
						<li>
							Uploading or sharing content that is offensive, harmful, or
							violates any laws.
						</li>
						<li>Using the service to distribute spam or malicious content.</li>
						<li>
							Attempting to gain unauthorized access to other user accounts or
							Valysis&apos;s systems.
						</li>
					</ul>
				</div>

				<h2 className='text-xl font-medium mt-12'>
					Game Data & Riot Integration
				</h2>

				<h3 className='text-lg mt-8'>Riot Account Connection</h3>
				<p className='mt-8 text-muted-foreground'>
					Valysis connects to your Riot account through Riot&qute;s official
					APIs in order to display statistics about your gameplay. By using
					Valysis, you grant permission to access and display this data.
				</p>

				<h3 className='text-lg mt-8'>Accuracy of Data</h3>
				<p className='mt-8 text-muted-foreground'>
					While we strive to present accurate and up-to-date data, we do not
					guarantee the completeness or accuracy of in-game statistics, as they
					are sourced directly from Riot&qute;s services.
				</p>

				<h2 className='text-xl font-medium mt-12'>User Content</h2>

				<h3 className='text-lg mt-8'>Ownership</h3>
				<p className='mt-8 text-muted-foreground'>
					You retain ownership of any content you upload or generate using
					Valysis. However, by using our service, you grant Valysis a
					non-exclusive, royalty-free license to process and display such
					content as part of our features.
				</p>

				<h2 className='text-xl font-medium mt-12'>Responsibility</h2>
				<p className='mt-8 text-muted-foreground'>
					You are solely responsible for your use of the service, including how
					you interpret or share any game data retrieved through Valysis.
				</p>

				<h2 className='text-xl font-medium mt-12'>Privacy</h2>
				<p className='mt-8 text-muted-foreground'>
					Your privacy is important to us. Please review our{' '}
					<Link href='/privacy' className='underline'>
						Privacy Policy
					</Link>{' '}
					to understand how we collect, use, and protect your information.
				</p>

				<h2 className='text-xl font-medium mt-12'>Termination</h2>
				<p className='mt-8 text-muted-foreground'>
					Valysis reserves the right to suspend or terminate your account at any
					time, with or without notice, for any reason, including but not
					limited to violation of these terms.
				</p>

				<h2 className='text-xl font-medium mt-12'>
					Disclaimers and Limitations of Liability
				</h2>

				<h3 className='text-lg mt-8'>No Warranties</h3>
				<p className='mt-8 text-muted-foreground'>
					Valysis is provided on an &quot;as is&quot; and &quot;as
					available&quot; basis. We do not warrant that the service will be
					uninterrupted, error-free, or free from viruses or other harmful
					components. Valysis is not affiliated with or endorsed by Riot Games.
				</p>

				<h3 className='text-lg mt-8'>Limitation of Liability</h3>
				<p className='mt-8 text-muted-foreground'>
					In no event shall Valysis be liable for any indirect, incidental,
					special, or consequential damages arising out of or in connection with
					your use of the service.
				</p>

				<h2 className='text-xl font-medium mt-12'>Governing Law</h2>
				<p className='mt-8 text-muted-foreground'>
					These terms shall be governed and construed in accordance with the
					laws of India, without regard to its conflict of law provisions.
				</p>

				<h2 className='text-xl font-medium mt-12'>Contact Us</h2>
				<p className='mt-8 text-muted-foreground'>
					If you have any questions or concerns about these Terms and
					Conditions, please contact us at support@valysis.io.
				</p>

				<p className='mt-8 font-medium'>
					By using Valysis, you acknowledge that you have read, understood, and
					agree to be bound by these terms and conditions.
				</p>
			</AnimationContainer>
		</MaxWidthWrapper>
	);
};

export default TermsPage;
