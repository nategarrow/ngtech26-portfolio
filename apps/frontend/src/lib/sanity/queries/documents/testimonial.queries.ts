import groq from 'groq';
import { imageFragment, richTextFragment } from '../fragments';

export const testimonialQuery = groq`
	_id,
	company,
	name,
	role,
	publishDate,
	image {
		${imageFragment}
	}
	quote[] {
		${richTextFragment}
	}
`;

export const allTestimonialsQuery = groq`*[_type == "testimonial"]`;
