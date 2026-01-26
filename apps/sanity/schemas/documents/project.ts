import {CodeBlockIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import type {StringRule, UrlRule} from 'sanity'

const projectType = defineType({
  name: 'project',
  type: 'document',
  icon: CodeBlockIcon,
  title: 'Project',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      title: 'Project Title',
      validation: (rule: StringRule) => rule.required(),
    }),
    defineField({
      name: 'client',
      type: 'string',
      group: 'content',
      title: 'Client',
      validation: (rule: StringRule) => rule.required(),
    }),
    defineField({
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'richImage',
      group: 'content',
    }),
    defineField({
      name: 'description',
      type: 'string',
      group: 'content',
      title: 'Description',
      validation: (rule: StringRule) => rule.required(),
    }),
    defineField({
      name: 'stats',
      type: 'array',
      group: 'content',
      validation: (rule) => rule.max(4),
      of: [
        defineArrayMember({
          name: 'projectStat',
          type: 'object',
          title: 'Project Stat',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Label',
              validation: (rule: StringRule) => rule.required(),
            }),
            defineField({
              name: 'value',
              type: 'string',
              title: 'Value',
              validation: (rule: StringRule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'techStack',
      type: 'string',
      group: 'content',
      title: 'Tech Stack',
    }),
    defineField({
      name: 'featuredImage',
      type: 'richImage',
      group: 'content',
      title: 'Featured Image',
    }),
    defineField({
      name: 'projectLink',
      type: 'url',
      group: 'content',
      title: 'Project Link',
      validation: (rule: UrlRule) => rule.required(),
    }),
    defineField({
      name: 'agencyLink',
      type: 'url',
      group: 'content',
      title: 'Agency Link',
    }),
    defineField({
      name: 'customColor',
      type: 'string',
      group: 'content',
      title: 'Custom Color',
      initialValue: 'default',
      options: {
        list: ['default', 'red', 'blue', 'green', 'purple'],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
    },
    prepare({title, client}: {title?: string; client?: string}) {
      return {
        title: client,
        subtitle: title,
      }
    },
  },
})

export default projectType
