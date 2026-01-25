import groq from 'groq';

import { testimonialQuery } from '@lib/sanity/queries/documents/testimonial.queries';

export const testimonialsQuery = groq`
  _type == "testimonialSlider" => {
    testimonials[]->{
      ${testimonialQuery}
    }
  }
`;
