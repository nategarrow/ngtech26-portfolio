import groq from 'groq';
import { richImageFragment } from '../fragments';

export const projectQuery = groq`
  _id,
	title,
	description,
	techStack,
	client,
	projectImage {
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
	customColor,
	types->{
		_id,
		title
	},
	tags[]->{
		_id,
		title
	}
`;

export const projectCardQuery = groq`
  _id,
	title,
	client,
	description,
	projectImage {
		${richImageFragment}
	},
	projectLink,
	agencyLink,
	types->{
		_id,
		title
	},
	tags[]->{
		_id,
		title
	}
`;

export const allProjectsQuery = groq`*[_type == "project"]`;
