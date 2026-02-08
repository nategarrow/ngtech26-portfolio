import { DocumentIcon } from '@sanity/icons'
import { DateRule, defineField } from 'sanity'

const jobType = {
  name: 'job',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'tags', title: 'Tags' },
    { name: 'seo', title: 'SEO' },
  ],
  fieldsets: [
    { name: 'duration', title: 'Duration', options: { columns: 2 } },
    { name: 'details', title: 'Details' },
  ],
  fields: [
    defineField({
      name: 'position',
      type: 'string',
      title: 'Position',
    }),
    defineField({
      name: 'company',
      type: 'string',
      title: 'Company',
    }),
    defineField({
      name: 'currentPosition',
      type: 'boolean',
    }),
    defineField({
      name: 'startDate',
      type: 'date',
      title: 'Start Date',
      fieldset: 'duration',
      validation: (rule: DateRule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      type: 'date',
      title: 'End Date',
      fieldset: 'duration',
      hidden: ({ parent }) => parent?.currentPosition,
    }),
    defineField({
      title: 'Note',
      name: 'note',
      type: 'string',
    }),
  ],
  orderings: [
    {
      title: 'Start Date, New',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
    {
      title: 'Start Date, Old',
      name: 'startDateAsc',
      by: [{ field: 'startDate', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      position: 'position',
      company: 'company',
      start: 'startDate',
      end: 'endDate',
    },
    prepare({
      position,
      company,
      start,
      end,
    }: {
      position?: string
      company?: string
      start?: string
      end?: string
    }) {
      const startYear = start && new Date(start).getFullYear()
      const endYear = end && new Date(end).getFullYear()

      const duration = startYear && endYear ? `${startYear} - ${endYear}` : `${startYear} - Present`

      return {
        title: position,
        subtitle: `${company} (${duration})`,
      }
    },
  },
}

export default jobType
