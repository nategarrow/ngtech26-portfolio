import {DocumentIcon} from '@sanity/icons'

const skillsType = {
  name: 'skills',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    {
      name: 'skill',
      type: 'string',
      title: 'Skill',
    },
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'skills',
      type: 'array',
      of: [
        {
          name: 'skillName',
          type: 'string',
        },
      ],
    },
  ],
}

export default skillsType
