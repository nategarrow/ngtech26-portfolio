import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'socials', title: 'Socials' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Site Title',
      group: 'content',
      hidden: true,
      initialValue: 'Site Settings',
    }),
    defineField({
      name: 'resumeLink',
      type: 'file',
      title: 'Resume Link',
      group: 'content',
    }),
    defineField({
      name: 'github',
      type: 'url',
      group: 'socials',
    }),
    defineField({
      name: 'linkedIn',
      title: 'LinkedIn',
      type: 'url',
      group: 'socials',
    }),
  ],
})
