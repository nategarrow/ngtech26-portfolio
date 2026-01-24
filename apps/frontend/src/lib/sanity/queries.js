import groq from 'groq';

export const homeQuery = groq`*[_type == "HomePage"]{
  heroContent,
  aboutContent,
  aboutStats,
  projectHighlights[]->{
    id,
    title,
    client,
    description,
    techStack,
    stats,
    "featuredImageUrl": featuredImage.asset->url,
    projectLink,
    agencyLink,
    customColor
  },
  experiences[]->{
    position,
    company,
    currentPosition,
    startDate,
    endDate,
    note,
  },
  skills,
  testimonials[]->{
    name,
    role,
    company,
    "imageUrl": image.asset->url,
    quote
  }
}`;
export const testimonialQuery = groq`*[_type == "Testimonial"]`;
export const jobQuery = groq`*[_type == "Job"] | order(startDate desc)`;
export const skillsQuery = groq`*[_type == "Skills"] | order(index asc)`;
