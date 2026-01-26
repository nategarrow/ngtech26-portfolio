import groq from 'groq';
import { richImageFragment } from '../fragments';

export const projectQuery = groq`
  _id,
	title,
	description,
	techStack,
	client,
	featuredImage {
		${richImageFragment}
	},
	clientLogo {
		${richImageFragment}
	},
	stats[] {
		_key,
		label,
		value,
	},
	projectLink,
	agencyLink,
	cusstomColor,
`;

export const allProjectsQuery = groq`*[_type == "project"]`;
