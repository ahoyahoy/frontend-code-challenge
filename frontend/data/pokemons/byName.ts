import { useQuery, gql } from '@apollo/client'

import {
  PokemonByName,
  PokemonByNameVariables,
} from '../_generated/PokemonByName'

export const QUERY = gql`
query PokemonByName($name: String!) {
  pokemonByName(name: $name) {
    id
    name
    weight {minimum, maximum}
    height {minimum, maximum}
    types
    maxCP
    maxHP
    image
    sound
    isFavorite
    evolutions {
      id
      name
      image
      isFavorite
    }
  }
}`

export type Q = PokemonByName
export type V = PokemonByNameVariables
export type R = Q['pokemonByName']

export const parseData = (data: Q): R => {
  return data?.pokemonByName
}

export const Use = ({ name }: PokemonByNameVariables) => {
  const query = useQuery<Q, V>(
    QUERY,
    {
      variables: {
        name,
      },
      ssr: true,
    }
  )

  const { loading, error, data } = query
  const parsecData = parseData(data as PokemonByName)

  return { loading, error, data: parsecData }
}
