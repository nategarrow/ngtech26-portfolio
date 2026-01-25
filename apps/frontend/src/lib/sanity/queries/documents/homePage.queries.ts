import groq from 'groq';

import { aboutMeQuery } from '@atomic/components/AboutMe/aboutMe.query';
import { heroQuery } from '@atomic/components/Hero/Hero.query';
import { resumeQuery } from '@atomic/components/Resume/Resume.query';
import { testimonialsQuery } from '@atomic/components/Testimonials/Testimonials.query';
import { client } from '@lib/sanity/client';

export const homePageQuery = groq`
  *[_type == "homePage" && defined(slug.current)][0] {
		_id,
		title,
		sections[] {
			...select(
				${heroQuery},
				${aboutMeQuery},
				${resumeQuery},
				${testimonialsQuery}
			),
		},
	}
`;

export const getHomePageData = async () => {
	console.log('🚀 ~ homePageQuery:', homePageQuery);
	const data = await client.fetch(homePageQuery);

	return data;
};
