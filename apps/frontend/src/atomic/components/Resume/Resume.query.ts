// import { jobQuery } from '@lib/sanity/queries/documents/job.queries';
import groq from 'groq';

export const resumeQuery = groq`
  _type == "resume" => {
    experiences[]->{
      _id,
      company,
      currentPosition,
      position,
      startDate,
      endDate,
      note,
      description,
    },
  }
`;
