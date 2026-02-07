import { defineArrayMember, defineField, defineType } from 'sanity'

export const resume = defineType({
  name: 'resume',
  type: 'object',
  fields: [
    defineField({
      name: 'experiences',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'job',
          type: 'reference',
          to: { type: 'job' },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => {
      return {
        title: 'Resume',
      }
    },
  },
})
