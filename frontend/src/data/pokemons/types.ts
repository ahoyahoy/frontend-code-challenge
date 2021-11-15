import { useQuery, gql } from '@apollo/client'

import {
    PokemonTypes
} from '../_generated/PokemonTypes'

export const QUERY = gql`
query PokemonTypes {
  pokemonTypes
}`

export type Q = PokemonTypes
export type R = Q['pokemonTypes']

export const parseData = (data: Q): R => {
    return data?.pokemonTypes
}

export const Use = () => {
    const query = useQuery<Q>(
        QUERY,
        {
            ssr: true,
        }
    )

    const { loading, error, data } = query
    const parsecData = parseData(data as PokemonTypes)

    return { loading, error, data: parsecData }
}
