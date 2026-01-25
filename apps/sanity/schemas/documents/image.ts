import { defineType, defineField } from 'sanity'

export const richImage = defineType({
  name: 'richImage',
  title: 'Rich Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Upload or select an image',
      options: {
        hotspot: true, // Enables image cropping
      },
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Alternative text for accessibility. Describe the image for screen readers.',
      validation: (Rule) => Rule.required(),
    }),

  ],
  preview: {
    select: {
      imageUrl: 'image',
      title: 'alt',
    },
    prepare({ imageUrl, title }) {
      return {
        title: title || 'Image without alt text',
        media: imageUrl,
      }
    },
  },
})
