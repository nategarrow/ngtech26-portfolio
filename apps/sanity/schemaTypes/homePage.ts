import {HomeIcon} from '@sanity/icons'
import {v4 as uuidv4} from 'uuid'
import {RuleType} from '../lib/types'

const homePageType = {
  name: 'HomePage',
  type: 'document',
  icon: HomeIcon,
  fieldsets: [
    {
      name: 'hero',
      title: 'Hero Content',
      options: {
        collapsible: true,
      },
    },
    {
      name: 'about',
      title: 'About Me',
      options: {
        collapsible: true,
      },
    },
    {
      name: 'works',
      title: 'Highlighted Works',
      options: {
        collapsible: true,
      },
    },
    {
      name: 'resume',
      title: 'Resume',
      options: {
        collapsible: true,
      },
    },
  ],
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'heroContent',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      fieldset: 'hero',
    },
    {
      name: 'aboutContent',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      fieldset: 'about',
    },
    {
      name: 'aboutStats',
      type: 'array',
      validation: (rule) => rule.min(3),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'value',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'valuePrefix',
              type: 'string',
            },
            {
              name: 'valueSuffix',
              type: 'string',
            },
          ],
        },
      ],
      fieldset: 'about',
    },
    {
      name: 'projectHighlights',
      type: 'array',
      of: [
        {
          name: 'project',
          type: 'reference',
          to: {type: 'Project'},
        },
      ],
      fieldset: 'works',
    },
    {
      name: 'experiences',
      type: 'array',
      of: [
        {
          name: 'job',
          type: 'reference',
          to: {type: 'Job'},
        },
      ],
      fieldset: 'resume',
    },
    {
      name: 'skills',
      type: 'array',
      of: [
        {
          name: 'skill',
          type: 'object',
          fields: [
            {
              name: 'id',
              type: 'string',
              initialValue: () => uuidv4(),
              readonly: true,
            },
            {
              name: 'name',
              type: 'string',
              validation: (rule: RuleType) => rule.required(),
            },
          ],
        },
      ],
      fieldset: 'resume',
    },
    {
      name: 'testimonials',
      type: 'array',
      of: [
        {
          name: 'testimonial',
          type: 'reference',
          to: {type: 'Testimonial'},
        },
      ],
      fieldset: 'resume',
    },
  ],
}

export default homePageType
