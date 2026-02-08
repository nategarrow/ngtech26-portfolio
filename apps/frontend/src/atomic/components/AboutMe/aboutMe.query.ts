import { richTextFragment } from '@lib/sanity/queries/fragments';
import groq from 'groq';

export const aboutMeQuery = groq`
  _type == "aboutMe" => {
    sectionTitle,
    aboutStats[] {
      _key,
      title,
      value,
      valuePrefix,
      valueSuffix,
    },
    aboutContent[] {
      ${richTextFragment}
    },
    openToWork
  }
`;
