import { defineArrayMember, defineField, defineType } from 'sanity'

export const testimonialSlider = defineType({
  name: 'testimonialSlider',
  type: 'object',
  title: 'Testimonial Slider',
  fields: [
    defineField({
      name: 'testimonials',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'testimonial',
          type: 'reference',
          to: { type: 'testimonial' },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => {
      return {
        title: 'Testimonial Slider',
      }
    },
  },
})
