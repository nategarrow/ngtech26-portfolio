import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  typegen: {
    path: '../frontend/src/**/*.{ts,tsx,js,jsx}',
    schema: 'schema.json',
    generates: '../frontend/src/lib/types/sanity.types.ts',
  },
})
