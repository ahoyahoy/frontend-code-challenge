/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FavoritePokemon
// ====================================================

export interface FavoritePokemon_favoritePokemon {
  __typename: "Pokemon";
  id: string;
  isFavorite: boolean;
}

export interface FavoritePokemon {
  favoritePokemon: FavoritePokemon_favoritePokemon | null;
}

export interface FavoritePokemonVariables {
  id: string;
}
