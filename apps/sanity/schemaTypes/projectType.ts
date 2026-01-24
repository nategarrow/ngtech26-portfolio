import {CodeBlockIcon} from '@sanity/icons'
import {RuleType} from '../lib/types'
import {v4 as uuidv4} from 'uuid'

const projectType = {
  name: 'Project',
  type: 'document',
  icon: CodeBlockIcon,
  title: 'Project',
  fields: [
    {
      name: 'id',
      type: 'string',
      title: '',
      readOnly: true,
      hidden: true,
      initialValue: () => uuidv4(),
    },
    {
      name: 'title',
      type: 'string',
      title: 'Project Title',
      validation: (rule: RuleType) => rule.required(),
    },
    {
      name: 'client',
      type: 'string',
      title: 'Client',
      validation: (rule: RuleType) => rule.required(),
    },
    {
      name: 'description',
      type: 'string',
      title: 'Description',
      validation: (rule: RuleType) => rule.required(),
    },
    {
      name: 'stats',
      type: 'array',
      validation: (rule) => rule.max(2),
      of: [
        {
          name: 'projectStat',
          type: 'object',
          title: 'Project Stat',
          fields: [
            {
              name: 'id',
              type: 'string',
              readOnly: true,
              hidden: true,
              initialValue: () => uuidv4(),
            },
            {
              name: 'label',
              type: 'string',
              title: 'Label',
              validation: (rule: RuleType) => rule.required(),
            },
            {
              name: 'value',
              type: 'string',
              title: 'Value',
              validation: (rule: RuleType) => rule.required(),
            },
          ],
        },
      ],
    },
    {
      name: 'techStack',
      type: 'string',
      title: 'Tech Stack',
    },
    {
      name: 'featuredImage',
      type: 'file',
      title: 'Featured Image',
    },
    {
      name: 'projectLink',
      type: 'slug',
      title: 'Project Link',
      validation: (rule: RuleType) => rule.required(),
    },
    {
      name: 'agencyLink',
      type: 'slug',
      title: 'Agency Link',
    },
    {
      name: 'customColor',
      type: 'string',
      title: 'Custom Color',
      initialValue: 'default',
      options: {
        list: ['default', 'red', 'blue', 'green', 'purple'],
      },
    },
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
}

export default projectType
