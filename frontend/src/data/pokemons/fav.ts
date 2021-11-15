import { gql } from '@apollo/client'
import { FavoritePokemon, FavoritePokemonVariables } from '../_generated/FavoritePokemon'
import { UnFavoritePokemon } from '../_generated/UnFavoritePokemon'
import { getApolloClient } from '../../apollo-client'

export const MUTATION_FAV = gql`
mutation FavoritePokemon($id: ID!) {
    favoritePokemon (id: $id) {
        id
        isFavorite
    }
}`
export const MUTATION_UNFAV = gql`
mutation UnFavoritePokemon($id: ID!) {
    unFavoritePokemon (id: $id) {
        id
        isFavorite
    }
}`


type Q = FavoritePokemon | UnFavoritePokemon
type R = FavoritePokemon['favoritePokemon'] | UnFavoritePokemon['unFavoritePokemon']

export const parseData = (data: Q): R => {
    return (data as FavoritePokemon)?.favoritePokemon || (data as UnFavoritePokemon)?.unFavoritePokemon
}

export const favoritePokemon = ({ id, state }: FavoritePokemonVariables & { state: boolean }) => {
    const res = (state: boolean) => ({
        __typename: 'Pokemon',
        id,
        isFavorite: state
    })

    getApolloClient()!.mutate({
        mutation: state ? MUTATION_FAV : MUTATION_UNFAV,
        update(cache, { data }) {
            cache.modify({
                id: 'Pokemon:' + parseData(data as Q)!.id,
                fields: {
                    isFavorite() {
                        return parseData(data as Q)!.isFavorite
                    },
                },
            })
        },
        variables: {
            id
        },
        optimisticResponse: state
            ? { favoritePokemon: res(state) }
            : { unFavoritePokemon: res(state) }
    })
}
