import { type EventHandler, EventType } from './types'

const fieldMappingHandler: EventHandler<EventType.GRAPHQL_FIELD_MAPPING> = (event, context) => {
  const fields = event.fields.map(({ contentTypeId, field }) => {
    return {
      contentTypeId,
      fieldId: field.id,
      graphQLOutputType: 'Character',
      graphQLQueryField: 'character',
      graphQLQueryArguments: { slug: '' },
    }
  })

  return {
    namespace: 'PotterDB',
    fields,
  }
}

const queryHandler: EventHandler<EventType.GRAPHQL_QUERY> = async (event, context) => {
  /*
   * Forwards the GraphQL query to the PotterDB GraphQL API as is.
   * The `event` contains a boolean `isIntrospectionQuery` that can be used to
   * determine if the query is an introspection query. This is useful when
   * the introspection requires different handling that the actual query.
   */
  const response = await fetch('https://api.potterdb.com/graphql', {
    body: JSON.stringify({
      query: event.query,
      operationName: event.operationName,
      variables: event.variables,
    }),
    method: 'POST',
    headers: { Accept: 'application/json', 'content-type': 'application/json' },
  })

  return response.json()
}

export const handler: EventHandler = (event, context) => {
  if (event.type === EventType.GRAPHQL_FIELD_MAPPING) {
    return fieldMappingHandler(event, context)
  }
  if (event.type === EventType.GRAPHQL_QUERY) {
    return queryHandler(event, context)
  }
  throw new Error('Unknown Event')
}