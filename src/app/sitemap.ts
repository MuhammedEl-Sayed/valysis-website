import { MetadataRoute } from 'next';
import { SITE_URL } from '@/utils/functions/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
	return ['', '/changelog', '/privacy', '/terms', '/delete-account'].map(
		(path) => ({
			url: `${SITE_URL}${path}`,
			changeFrequency: path === '' || path === '/changelog' ? 'weekly' : 'yearly',
			priority: path === '' ? 1 : 0.5,
		})
	);
}
