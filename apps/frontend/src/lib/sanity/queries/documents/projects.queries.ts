import groq from 'groq';
import { imageFragment } from '../fragments';

export const projectQuery = groq`
  _id,
	title,
	description,
	techStack,
	client,
	featuredImage {
		${imageFragment}
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
