import { getHomePageData } from '@lib/sanity/queries/documents/homePage.queries';

export const load = async () => {
	return await getHomePageData();
};
