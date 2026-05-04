import { CodeBlockIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'
import type { StringRule, UrlRule } from 'sanity'

const project = defineType({
  name: 'project',
  type: 'document',
  icon: CodeBlockIcon,
  title: 'Project',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'clients', title: 'Clients' },
    { name: 'tags', title: 'Tags' },
    { name: 'seo', title: 'SEO' },
  ],
  fieldsets: [{ name: 'card', title: 'Card Data', options: { collapsible: true } }],
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
      group: 'clients',
      title: 'Client',
    }),
    defineField({
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'richImage',
      group: 'clients',
      hidden: ({ parent }) => parent.client === '',
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
      fieldset: 'card',
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
      title: 'Tech Stack',
      type: 'string',
      group: 'content',
      fieldset: 'card',
    }),
    defineField({
      name: 'projectImage',
      title: 'Project Image',
      type: 'richImage',
      group: 'content',
      fieldset: 'card',
    }),
    defineField({
      name: 'projectLink',
      type: 'url',
      group: 'content',
      title: 'Project Link',
    }),
    defineField({
      title: 'Agency Link',
      name: 'agencyLink',
      type: 'url',
      group: 'clients',
    }),
    defineField({
      title: 'Launch Date',
      name: 'launchDate',
      type: 'date',
      group: 'clients',
    }),
    defineField({
      deprecated: {
        reason: 'Color now defined by project type',
      },
      name: 'customColor',
      type: 'string',
      group: 'content',
      title: 'Custom Color',
      initialValue: 'default',
      options: {
        list: ['default', 'red', 'blue', 'purple'],
      },
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'reference',
      to: [{ type: 'projectType' }],
      group: 'tags',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
      group: 'tags',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
    },
    prepare({ title, client }: { title?: string; client?: string }) {
      return {
        title: title || 'No Title',
        subtitle: client || 'Personal',
      }
    },
  },
})

export default project
