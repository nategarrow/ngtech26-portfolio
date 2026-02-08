import { defineArrayMember, defineField, defineType } from 'sanity'

export const richText = defineType({
  name: 'richText',
  title: 'Rich Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [
          defineField({
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                    allowRelative: true,
                  }),
              }),
              defineField({
                name: 'blank',
                type: 'boolean',
                title: 'Open in new tab',
                initialValue: true,
              }),
            ],
          }),
        ],
      },
    }),
  ],
})
