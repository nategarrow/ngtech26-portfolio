import groq from 'groq';

import { projectSpotlightQuery } from '@atomic/components/ProjectSpotlight/ProjectSpotlight.query';
import { aboutMeQuery } from '@components/AboutMe/aboutMe.query';
import { heroQuery } from '@components/Hero/Hero.query';
import { resumeQuery } from '@components/Resume/Resume.query';
import { testimonialsQuery } from '@components/Testimonials/Testimonials.query';

export const sectionsQuery = groq`
	_key,
	_type,
	...select(
		${heroQuery},
		${aboutMeQuery},
		${resumeQuery},
		${projectSpotlightQuery},
		${testimonialsQuery},
	),
`;
