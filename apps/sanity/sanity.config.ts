import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'

import { schemaTypes } from './schemas'

import { structure } from './lib/structure'

const singletonTypes = new Set(['homePage'])

export default defineConfig({
  name: 'ngtech-portfolio',
  title: 'NGTech Portfolio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
    media(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
})
