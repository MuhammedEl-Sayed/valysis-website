import Link from 'next/link';
import { AnimationContainer, Icons } from '@/components';
import Image from 'next/image';

const Footer = () => {
	return (
		<footer className='flex flex-col items-center justify-center border-t border-border pt-16 pb-8 px-6 lg:px-8 w-full max-w-6xl mx-auto lg:pt-32 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] text-center'>
			{/* Decorative Line */}
			<div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1.5 bg-foreground rounded-full'></div>

			{/* Content Wrapper */}
			<div className='flex flex-row items-center justify-start gap-y-6  '>
				<AnimationContainer delay={0.1}>
					<div className='flex flex-col items-center justify-center max-w-[250px] text-center'>
						<Image src='/image.png' alt='Valysis Logo' width={50} height={50} />
						<p className='text-muted-foreground mt-4 text-sm'>
							Improve your rank with stats.
						</p>
						<span className='mt-4 text-neutral-200 text-sm'>
							Made by{' '}
							<Link
								href='https://shreyas-sihasane.vercel.app/'
								className='font-semibold ml-1'
							>
								Muhammed
							</Link>
						</span>
						<p className='text-sm text-muted-foreground mt-4'>
							&copy; {new Date().getFullYear()} Valysis INC. All rights
							reserved.
						</p>
					</div>
				</AnimationContainer>

				{/* Links Section */}
				<AnimationContainer delay={0.2}>
					<div className='flex flex-col items-center justify-center'>
						<h3 className='text-base font-medium text-white'>Our Links</h3>
						<ul className='mt-4 text-sm text-muted-foreground space-y-2'>
							<li>
								<Link
									href=''
									className='hover:text-foreground transition-all duration-300'
								>
									Discord
								</Link>
							</li>
							<li>
								<Link
									href='/privacy'
									className='hover:text-foreground transition-all duration-300'
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href='/terms'
									className='hover:text-foreground transition-all duration-300'
								>
									Terms & Conditions
								</Link>
							</li>
						</ul>
					</div>
				</AnimationContainer>
			</div>

			{/* Bottom Border */}
			<div className='mt-8 border-t border-border/40 pt-4 w-full'></div>
		</footer>
	);
};

export default Footer;
