import { MetadataRoute } from 'next';
import { SITE_URL } from '@/utils/functions/metadata';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/api/', '/auth-callback'],
		},
		sitemap: `${SITE_URL}/sitemap.xml`,
	};
}
