import groq from 'groq';

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0] {
	...,
	"resumeLink": resumeLink {
		asset-> {
			_id,
			url,
		}
	}
}
`;
