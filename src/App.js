import React from "react";
import { PokemonProvider } from "../src/components/pokemonContext/pokemonContext";
import PokemonList from "../src/components/pokemonContext/pokemonList2";
import PokemonForm from '../src/components/pokemonContext/pokemonForm';

function App() {
  return (
    <PokemonProvider>
            <h1>Pokémon Manager</h1>
            <PokemonForm />
            <PokemonList />
        </PokemonProvider>
  );
}

export default App;
