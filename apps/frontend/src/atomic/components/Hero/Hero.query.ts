import { imageFragment, richTextFragment } from '@lib/sanity/queries/fragments';
import groq from 'groq';

export const heroQuery = groq`
  _type == "hero" => {
    avatar {
      ${imageFragment}
    },
    title,
    subheading,
    content[] {
      ${richTextFragment}
    }
  }
`;
