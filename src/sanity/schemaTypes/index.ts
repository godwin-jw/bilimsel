import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './post'
import { publicationType } from './publication'
import { teamType } from './team'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, publicationType, teamType],
}