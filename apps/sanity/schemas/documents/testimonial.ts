import { ConfettiIcon } from '@sanity/icons'

import { RuleType } from '../../lib/types'

const testimonialType = {
  name: 'testimonial',
  type: 'document',
  icon: ConfettiIcon,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (rule: RuleType) => rule.required(),
    },
    {
      name: 'role',
      type: 'string',
      validation: (rule: RuleType) => rule.required(),
    },
    {
      name: 'company',
      type: 'string',
      validation: (rule: RuleType) => rule.required(),
    },
    {
      name: 'image',
      type: 'image',
    },
    {
      name: 'quote',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      validation: (rule: RuleType) => rule.required(),
    },
    {
      name: 'publishDate',
      type: 'date',
      title: 'Publish Date',
    },
  ],
  orderings: [
    {
      title: 'Name, ASC',
      name: 'name',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Name, DESC',
      name: 'name',
      by: [{ field: 'name', direction: 'desc' }],
    },
    {
      title: 'Publish Date, New',
      name: 'publishDateDesc',
      by: [{ field: 'publishDate', direction: 'desc' }],
    },
    {
      title: 'Publish Date, Old',
      name: 'publishDateAsc',
      by: [{ field: 'publishDate', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      name: 'name',
      role: 'role',
      company: 'company',
    },
    prepare: ({ name, role, company }: { name?: string; role?: string; company?: string }) => {
      return {
        title: name,
        subtitle: company ? `${role || ''}, ${company || ''}` : role || '',
      }
    },
  },
}

export default testimonialType
