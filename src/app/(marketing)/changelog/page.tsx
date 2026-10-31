import AnimationContainer from "@/components/global/animation-container";
import React from 'react'
import { generateMetadata } from '@/utils';

export const metadata = generateMetadata({
	title: 'Changelog',
	description: "What's new in each Valysis release.",
	path: '/changelog',
});

const ChangeLogPage = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <AnimationContainer delay={0.1}>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold font-heading text-center mt-6 !leading-tight">
                    Change Log
                </h1>
                <p className="text-base md:text-lg mt-6 text-center text-muted-foreground">
                    Stay up to date with the latest changes to our platform.
                </p>
            </AnimationContainer>
        </div>
    )
};

export default ChangeLogPage
