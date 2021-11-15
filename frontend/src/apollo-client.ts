import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'

const isServer = typeof window === 'undefined'
// @ts-ignore
const windowApolloState = !isServer && window.__NEXT_DATA__.apolloState

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

export function createApolloClient() {
  return new ApolloClient({
    ssrMode: isServer,
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache().restore(windowApolloState || {}),
  })
}

export function getApolloClient(forceNew: boolean = false) {
  if (!apolloClient || forceNew) {
    apolloClient = createApolloClient()
  }
  return apolloClient
}
