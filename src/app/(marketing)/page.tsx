import {
	AnimationContainer,
	MaxWidthWrapper,
	PricingCards,
} from '@/components';
import { BentoCard, BentoGrid, CARDS } from '@/components/ui/bento-grid';
import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { LampContainer } from '@/components/ui/lamp';
import MagicBadge from '@/components/ui/magic-badge';
import MagicCard from '@/components/ui/magic-card';
import { MobileImageCarousel } from '@/components/ui/mobile-image-carousel';
import { TransitioningImages } from '@/components/ui/transitioning-images';
import { COMPANIES, PROCESS } from '@/utils';
import { REVIEWS } from '@/utils/constants/misc';
import { ArrowRightIcon, CreditCardIcon, StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
const HomePage = async () => {
	return (
		<div className='overflow-x-hidden scrollbar-hide size-full'>
			{/* Hero Section */}
			<MaxWidthWrapper>
				<div className='flex flex-col items-center justify-center w-full text-center bg-gradient-to-t from-background'>
					<AnimationContainer className='flex flex-col items-center justify-center w-full text-center'>
						<h1 className='text-foreground text-center py-6 text-5xl font-medium tracking-normal text-balance sm:text-6xl md:text-7xl lg:text-8xl !leading-[1.15] w-full font-heading'>
							Heatmaps, Insights,{' '}
							<span className='text-transparent bg-gradient-to-r from-[#ff897d] to-[#9c524b] bg-clip-text inline-bloc'>
								Domination
							</span>
						</h1>
						<p className='mb-12 text-lg tracking-tight text-muted-foreground md:text-xl text-balance'>
							Effortlessly track and visualize your stats with Valysis.{' '}
							<br className='hidden md:block' />
							<span className='hidden md:block'>
								Analyze, plan, and optimize your performance—all in one place.
							</span>
						</p>
						<div className='flex items-center justify-center whitespace-nowrap gap-4 z-50'>
							<Button asChild></Button>
						</div>

						<div className='flex items-center justify-center gap-4 mt-8'>
							<Link
								href='https://apps.apple.com/app/id6449222801'
								target='_blank'
								className='flex items-center justify-center gap-2'
							>
								<Image
									src='/assets/app-store-badge.png'
									alt='App Store'
									width={150}
									height={50}
								/>
							</Link>
							<Link
								href='https://play.google.com/store/apps/details?id=com.valysis'
								target='_blank'
								className='flex items-center justify-center gap-2'
							>
								<Image
									src='/assets/google-play-badge.png'
									alt='Google Play'
									width={150}
									height={50}
								/>
							</Link>
						</div>
					</AnimationContainer>

					<AnimationContainer
						delay={0.2}
						className='relative pt-8 sm:pt-20 md:pt-32 pb-12 px-2 bg-transparent w-full flex items-center justify-center'
					>
						<div className='absolute md:top-[10%] left-1/2 gradient w-3/4 -translate-x-1/2 h-1/4 md:h-1/3 inset-0 blur-[5rem] animate-image-glow'></div>
						<div className='-m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl flex items-center'>
							<BorderBeam size={250} duration={12} delay={9} />
							<div className='flex  gap-4 items-stretch '>
								<TransitioningImages />
								{/* Desktop view: show side-by-side only from md upward */}
								<div className='hidden sm:flex gap-4 w-full'>
									<Image
										src='/assets/main.png'
										alt='Dashboard'
										width={400}
										height={400}
										quality={100}
									/>
									<Image
										src='/assets/analysis.png'
										alt='Dashboard'
										width={400}
										height={400}
										quality={100}
									/>
								</div>
							</div>

							<div className='absolute -bottom-4 inset-x-0 w-full h-1/2 bg-gradient-to-t from-background z-40'></div>
							<div className='absolute bottom-0 md:-bottom-8 inset-x-0 w-full h-1/4 bg-gradient-to-t from-background z-50'></div>
						</div>
					</AnimationContainer>
				</div>
			</MaxWidthWrapper>
		</div>
	);
};

export default HomePage;
