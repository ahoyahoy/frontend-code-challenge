/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PokemonsList
// ====================================================

export interface PokemonsList_pokemons_edges {
  __typename: "Pokemon";
  id: string;
  name: string;
  types: string[];
  image: string;
  isFavorite: boolean;
}

export interface PokemonsList_pokemons {
  __typename: "PokemonConnection";
  edges: PokemonsList_pokemons_edges[];
}

export interface PokemonsList {
  pokemons: PokemonsList_pokemons;
}

export interface PokemonsListVariables {
  offset: number;
  limit: number;
  search?: string | null;
  type?: string | null;
  favorite?: boolean | null;
}
