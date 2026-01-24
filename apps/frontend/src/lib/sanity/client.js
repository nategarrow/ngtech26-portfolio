import { apiVersion, dataset, projectId, studioUrl } from '@lib/sanity/api';
import { createClient } from '@sanity/client';

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: false,
	stega: {
		studioUrl,
	},
});
