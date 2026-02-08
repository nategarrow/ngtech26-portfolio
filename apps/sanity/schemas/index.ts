import { documents } from './documents/'
import { fields } from './fields'
import { components } from './components'
import { taxonomies } from './taxonomies'

export const schemaTypes = [...documents, ...taxonomies, ...fields, ...components]
