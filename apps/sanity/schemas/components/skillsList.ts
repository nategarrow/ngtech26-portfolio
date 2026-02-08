import { defineArrayMember, defineField, defineType, type StringRule } from 'sanity'

export const skillsList = defineType({
  name: 'skillsList',
  title: 'Skills List',
  type: 'object',
  fields: [
    defineField({
      name: 'skills',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'name',
          type: 'string',
          validation: (rule: StringRule) => rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => {
      return {
        title: 'Skills List',
      }
    },
  },
})
