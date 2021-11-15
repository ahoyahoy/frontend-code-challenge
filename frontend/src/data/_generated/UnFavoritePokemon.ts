/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UnFavoritePokemon
// ====================================================

export interface UnFavoritePokemon_unFavoritePokemon {
  __typename: "Pokemon";
  id: string;
  isFavorite: boolean;
}

export interface UnFavoritePokemon {
  unFavoritePokemon: UnFavoritePokemon_unFavoritePokemon | null;
}

export interface UnFavoritePokemonVariables {
  id: string;
}
