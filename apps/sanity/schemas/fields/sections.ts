import { defineType, defineArrayMember } from 'sanity'

import { components } from '../components'

export const sections = defineType({
  name: 'sections',
  title: 'Sections',
  type: 'array',
  of: components.map((component) =>
    defineArrayMember({
      type: component.name,
    }),
  ),
})
