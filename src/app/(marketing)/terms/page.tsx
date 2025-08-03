import { AnimationContainer, MaxWidthWrapper } from '@/components';
import Link from 'next/link';

const TermsPage = () => {
	return (
		<MaxWidthWrapper className='max-w-3xl mx-auto px-8 mb-40'>
			<AnimationContainer delay={0.1} className='w-full'>
				<h1 className='text-4xl md:text-6xl font-heading font-bold my-12 text-center w-full'>
					Terms of Service
				</h1>
				<p className='text-sm mb-2 italic mt-20'>Last updated: May 13, 2025</p>

				<p className='mt-4'>
					Welcome to Valysis. These terms and conditions outline the rules and
					regulations for the use of Valysis's website, mobile application, and
					services.
				</p>

				<h2 className='text-xl font-medium mt-8'>Acceptance of Terms</h2>
				<p className='mt-8 text-muted-foreground'>
					By accessing and using Valysis, you accept and agree to be bound by
					these terms. If you do not agree, please do not use our service.
				</p>

				<h2 className='text-xl font-medium mt-12'>Changes to Terms</h2>
				<p className='mt-8 text-muted-foreground'>
					We may update these terms occasionally. When we do, we’ll update the
					“Last updated” date above. Continued use of the app means you accept
					any changes.
				</p>

				<h2 className='text-xl font-medium mt-12'>Use of Services</h2>

				<h3 className='text-lg mt-8'>Eligibility</h3>
				<p className='mt-8'>
					You must be at least 18 years old and capable of entering into a
					binding contract to use Valysis.
				</p>

				<h3 className='text-lg mt-8'>Account Registration</h3>
				<ul className='list-disc ml-8 text-muted-foreground mt-4'>
					<li>Provide accurate and complete information.</li>
					<li>
						You’re responsible for maintaining the confidentiality of your
						account.
					</li>
					<li>Notify us immediately of any unauthorized access.</li>
				</ul>

				<h3 className='text-lg mt-8'>Acceptable Use</h3>
				<p className='mt-4 text-muted-foreground'>
					Do not use Valysis for illegal or harmful activities, including:
				</p>
				<ul className='list-disc text-muted-foreground ml-8'>
					<li>Sharing offensive or illegal content</li>
					<li>Distributing spam or malware</li>
					<li>Attempting to breach or misuse our systems or data</li>
				</ul>

				<h2 className='text-xl font-medium mt-12'>
					Game Data & Riot Integration
				</h2>

				<h3 className='text-lg mt-8'>Riot Account Connection</h3>
				<p className='mt-8 text-muted-foreground'>
					Valysis connects to your Riot account using Riot’s official APIs to
					show gameplay statistics. You authorize us to access and display this
					data.
				</p>

				<h3 className='text-lg mt-8'>Accuracy of Data</h3>
				<p className='mt-8 text-muted-foreground'>
					While we try to provide accurate data, it comes directly from Riot’s
					services and may not always be up to date or error-free.
				</p>

				<h2 className='text-xl font-medium mt-12'>User Content</h2>

				<h3 className='text-lg mt-8'>Ownership & License</h3>
				<p className='mt-8 text-muted-foreground'>
					You retain ownership of your content. By using the app, you grant
					Valysis a worldwide, non-exclusive, royalty-free license to use, host,
					display, and process your content in connection with our features.
				</p>

				<h2 className='text-xl font-medium mt-12'>Responsibility</h2>
				<p className='mt-8 text-muted-foreground'>
					You’re responsible for how you use Valysis, including any sharing or
					interpretation of gameplay data.
				</p>

				<h2 className='text-xl font-medium mt-12'>Privacy</h2>
				<p className='mt-8 text-muted-foreground'>
					Your privacy matters. Please review our{' '}
					<Link href='/privacy' className='underline'>
						Privacy Policy
					</Link>{' '}
					to learn more.
				</p>

				<h2 className='text-xl font-medium mt-12'>Termination</h2>
				<p className='mt-8 text-muted-foreground'>
					We may suspend or terminate your access for violating these terms or
					for any reason, with or without notice.
				</p>

				<h2 className='text-xl font-medium mt-12'>Disclaimers & Limitations</h2>

				<h3 className='text-lg mt-8'>No Warranties</h3>
				<p className='mt-8 text-muted-foreground'>
					Valysis is provided “as is.” We make no guarantees about uptime,
					accuracy, or virus protection. We are not affiliated with Riot Games.
				</p>

				<h3 className='text-lg mt-8'>Limitation of Liability</h3>
				<p className='mt-8 text-muted-foreground'>
					Valysis is not liable for indirect, incidental, or consequential
					damages resulting from your use of the service.
				</p>

				<h2 className='text-xl font-medium mt-12'>Governing Law</h2>
				<p className='mt-8 text-muted-foreground'>
					These terms are governed by the laws of the State of New Jersey,
					United States.
				</p>

				<h2 className='text-xl font-medium mt-12'>Contact Us</h2>
				<p className='mt-8 text-muted-foreground'>
					If you have any questions about these terms, email us at
					contact@valysis.com.
				</p>

				<p className='mt-8 font-medium'>
					By using Valysis, you agree to these Terms of Service.
				</p>
			</AnimationContainer>
		</MaxWidthWrapper>
	);
};

export default TermsPage;
