import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  deployment: {
    appId: 'jqh2md2kpg326qs8lmo7vj3t',
  },
  typegen: {
    path: '../frontend/src/**/*.{ts,tsx,js,jsx}',
    schema: 'schema.json',
    generates: '../frontend/src/lib/types/sanity.types.ts',
  },
})
