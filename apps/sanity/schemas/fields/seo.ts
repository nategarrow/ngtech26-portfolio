import {defineType, defineField, SlugValidationContext} from 'sanity'

import {PrefixedSlugInput} from '../../lib/components/PrefixedSlugInput'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fieldsets: [
    {name: 'metaInfo', title: 'Meta Information'},
    {name: 'openGraph', title: 'Open Graph'},
  ],
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The URL path for this page.',
      options: {
        // The Generate button will use the parent document's title field to generate the slug.
        source: 'title',
        isUnique: isUniqueSlug,
      },
      components: {
        input: PrefixedSlugInput,
      },
      validation: (Rule) =>
        Rule.required().custom((slug: {current?: string} | undefined) => {
          if (!slug || !slug.current) return true

          return slug.current.endsWith('/') ? 'Slug must NOT end with a trailing slash ("/")' : true
        }),
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      validation: (rule) => rule.required(),
      fieldset: 'metaInfo',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'richText',
      fieldset: 'metaInfo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      fieldset: 'openGraph',
    }),
  ],
})

export async function isUniqueSlug(slug: string, context: SlugValidationContext) {
  const {document, getClient} = context

  const client = getClient({apiVersion: '2025-02-19'})
  const id = (document as any)?._id?.replace(/^drafts\./, '')
  const params = {
    id,
    type: (document as any)?._type,
    slug,
  }

  // Ensure uniqueness among documents of the same type
  // where seo.slug.current matches, excluding this document and its draft
  const query = `!defined(*[
    !(_id in [$id, "drafts." + $id]) &&
    _type == $type &&
    seo.slug.current == $slug
  ][0]._id)`

  const result = await client.fetch(query, params)
  return result
}
