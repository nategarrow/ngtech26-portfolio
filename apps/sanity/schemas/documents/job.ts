import { DocumentIcon } from '@sanity/icons'
import { RuleType } from '../../lib/types'

const jobType = {
  name: 'job',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    {
      name: 'position',
      type: 'string',
      title: 'Position',
    },
    {
      name: 'company',
      type: 'string',
      title: 'Company',
    },
    {
      name: 'currentPosition',
      type: 'boolean',
    },
    {
      name: 'startDate',
      type: 'date',
      title: 'Start Date',
      validation: (rule: RuleType) => rule.required(),
    },
    {
      name: 'endDate',
      type: 'date',
      title: 'End Date',
      hidden: ({ document }) => document?.currentPosition,
    },
    {
      title: 'Note',
      name: 'note',
      type: 'string',
    },
    {
      name: 'description',
      type: 'array',
      title: 'Description',
      of: [
        {
          type: 'block',
        },
      ],
    },
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
