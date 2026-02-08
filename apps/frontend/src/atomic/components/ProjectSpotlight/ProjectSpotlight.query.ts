import { projectQuery } from '@lib/sanity/queries/documents/projects.queries';
import groq from 'groq';

export const projectSpotlightQuery = groq`
  _type == "projectSpotlight" => {
    projectHighlights[]->{
      ${projectQuery}
    }
  }
`;
