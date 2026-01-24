import { homeQuery } from '$lib/sanity/queries';
import { client } from '@lib/sanity/client.js';

export const load = async () => {
	const homeData = await client.fetch(homeQuery);

	return {
		homeData,
	};
};
