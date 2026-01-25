import { client } from '@lib/sanity/client.js';
import { homePageQuery } from '@lib/sanity/queries/documents/homePage.queries';

export const load = async () => {
	const data = await client.fetch(homePageQuery);

	return {
		data,
	};
};
