import { defineArrayMember, defineType, defineField } from 'sanity'

export const aboutMe = defineType({
  name: 'aboutMe',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      type: 'string',
    }),
    defineField({
      name: 'aboutContent',
      type: 'richText',
    }),
    defineField({
      name: 'aboutStats',
      type: 'array',
      validation: (rule) => rule.min(3),
      of: [
        defineArrayMember({
          type: 'object',
          fieldsets: [
            { name: 'value', title: 'Value', options: { columns: 2 } },
            { name: 'modifiers', title: 'Modifiers', options: { columns: 2 } },
          ],
          fields: [
            {
              name: 'title',
              type: 'string',
              fieldset: 'value',
              validation: (rule) => rule.required(),
            },
            {
              name: 'value',
              type: 'string',
              fieldset: 'value',
              validation: (rule) => rule.required(),
            },
            {
              name: 'valuePrefix',
              type: 'string',
              fieldset: 'modifiers',
            },
            {
              name: 'valueSuffix',
              type: 'string',
              fieldset: 'modifiers',
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'openToWork',
      type: 'boolean',
      title: 'Open to Work',
      initialValue: false,
    }),
  ],
})
