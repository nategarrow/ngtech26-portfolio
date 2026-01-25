import groq from 'groq';

export const jobQuery = groq`
  _id,
	company,
	currentPosition,
	position,
	startDate,
	endDate,
	note,
	description
`;

export const allJobQuery = groq`*[_type == "job"] | order(startDate desc)`;
