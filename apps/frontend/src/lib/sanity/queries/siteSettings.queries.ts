import groq from 'groq';

export const siteSettingsQuery = groq`*[_type == "siteSettings"] {
	...,
  resumeLink-> {
	...
	},
}
`;
