import groq from 'groq';

import { client } from '@lib/sanity/client';
import { seoFragment } from '@lib/sanity/queries/fragments';
import { sectionsQuery } from '@lib/sanity/queries/sections.queries';

export const homePageQuery = groq`
  *[_type == "homePage" && defined(seo.slug.current)][0] {
		_id,
		title,
		sections[] {
			${sectionsQuery}
		},
		${seoFragment}
	}
`;

export const getHomePageData = async () => {
	const data = await client.fetch(homePageQuery);

	return data;
};
