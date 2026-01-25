import {HomeIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

import type {StringRule} from 'sanity'

const homePageType = defineType({
  name: 'homePage',
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
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
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
      title: 'Title',
      group: 'content',
    }),
    defineField({
      name: 'sections',
      type: 'sections',
      group: 'content',
    }),    
  ],
})

export default homePageType
