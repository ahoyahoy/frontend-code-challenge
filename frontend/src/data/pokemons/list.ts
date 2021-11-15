import{ useState } from 'react'
import { useQuery, gql } from '@apollo/client'

import {
    PokemonsList,
    PokemonsListVariables,
} from '../_generated/PokemonsList'

export const QUERY = gql`
query PokemonsList($offset: Int!, $limit: Int!, $search: String, $type: String, $favorite: Boolean) {
  pokemons(query: {offset: $offset, limit: $limit search: $search, filter: {type: $type, isFavorite: $favorite}}) {
    edges {
      id
      name
      types
      image
      isFavorite
    }
  }
}`

export type Q = PokemonsList
export type V = PokemonsListVariables
export type R = Q['pokemons']['edges']

export const parseData = (data: Q): R => {
    return data?.pokemons?.edges
}

export const parseMoreData = (prevResult: Q, fetchMoreResult: Q): Q => {
    if (!fetchMoreResult) return prevResult
    const pokemons = [...parseData(prevResult), ...parseData(fetchMoreResult)]
    const r: Q = JSON.parse(JSON.stringify(prevResult))
    r.pokemons.edges = pokemons
    
    return r
}

export const Use = ({ limit = 12, offset = 0, search = '', type = '', favorite = false }: PokemonsListVariables) => {
    const [loadingMore, setLoadingMore] = useState(false)

    const query = useQuery<Q, V>(
        QUERY,
        {
            variables: {
                limit,
                offset,
                search,
                type,
                favorite
            },
            ssr: true,
            fetchPolicy: (search?.length || favorite) ? 'network-only' : 'cache-first'
        }
    )

    const { loading, error, data, fetchMore } = query
    const parsedData = parseData(data as PokemonsList)

    const more = ({ limit = 12 }) => {
        setLoadingMore(true)

        fetchMore({
            variables: {
                offset: parsedData.length,
                limit
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                setLoadingMore(false)
                return parseMoreData(prev, fetchMoreResult as PokemonsList)
            }
        })

        return () => { }
    }

    return { loading, error, data: parsedData, fetchMore, parseMoreData, more, loadingMore }
}
