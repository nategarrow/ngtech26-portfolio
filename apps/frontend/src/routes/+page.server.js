import { getHomePageData } from '@lib/sanity/queries/documents/homePage.queries';

export const load = async () => {
	const data = await getHomePageData();

	return data;
};
