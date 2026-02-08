import groq from 'groq';

export const imageFragment = groq`
	asset-> {
		_id,
		mimeType,
		metadata {
			dimensions
		},
		originalFilename,
		url,
	}
`;

export const richImageFragment = groq`
	_type == "richImage" => {
		_type,
		alt,
		image {
			${imageFragment}
		}
	}
`;

export const fileFragment = groq`
	asset -> {
		_id,
		assetId,
		originalFilename,
		url,
	}
`;

export const richTextFragment = groq`
	...,
	...select(
		${richImageFragment}
	)
`;

export const seoFragment = groq`
	seo {
		"slug": slug.current,
		metaTitle,
		metaDescription[] {
			${richTextFragment}
		},
		ogImage {
			${imageFragment}
		},
	}
`;
