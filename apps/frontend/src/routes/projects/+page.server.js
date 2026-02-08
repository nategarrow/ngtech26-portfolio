import { client } from '@lib/sanity/client.js';
import { projectCardQuery } from '@lib/sanity/queries/documents/projects.queries';
import groq from 'groq';

const pageQuery = groq`
	{
		"projects": *[_type == "project"] | order(launchDate desc) {
			${projectCardQuery}
		},
		"taxonomies": {
			"types": *[_type == "projectType"] | order(title asc) {
				...,
			},
			"tags": *[_type == "tag"] | order(title asc) {
				...,
			},
		}
	}
`;

export const load = async () => {
	const data = await client.fetch(pageQuery);

	return data;
};
