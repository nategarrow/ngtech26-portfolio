import { defineArrayMember, defineField, defineType } from 'sanity'

export const projectSpotlight = defineType({
  name: 'projectSpotlight',
  type: 'object',
  title: 'Project Spotlight',
  fields: [
    defineField({
      name: 'projectHighlights',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'project',
          type: 'reference',
          to: { type: 'project' },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Project Spotlight',
      }
    },
  },
})
