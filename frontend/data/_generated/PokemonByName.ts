/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PokemonByName
// ====================================================

export interface PokemonByName_pokemonByName_weight {
  __typename: "PokemonDimension";
  minimum: string;
  maximum: string;
}

export interface PokemonByName_pokemonByName_height {
  __typename: "PokemonDimension";
  minimum: string;
  maximum: string;
}

export interface PokemonByName_pokemonByName_evolutions {
  __typename: "Pokemon";
  id: string;
  name: string;
  types: string[];
  image: string;
  isFavorite: boolean;
}

export interface PokemonByName_pokemonByName {
  __typename: "Pokemon";
  id: string;
  name: string;
  weight: PokemonByName_pokemonByName_weight;
  height: PokemonByName_pokemonByName_height;
  types: string[];
  maxCP: number;
  maxHP: number;
  image: string;
  sound: string;
  isFavorite: boolean;
  evolutions: PokemonByName_pokemonByName_evolutions[];
}

export interface PokemonByName {
  pokemonByName: PokemonByName_pokemonByName | null;
}

export interface PokemonByNameVariables {
  name: string;
}
