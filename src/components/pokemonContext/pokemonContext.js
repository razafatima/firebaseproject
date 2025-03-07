import React, { createContext, useContext, useEffect, useState } from "react";

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState(() => {
    const savedPokemons = localStorage.getItem("pokemons");
    return savedPokemons ? JSON.parse(savedPokemons) : [];
  });

  useEffect(() => {
    if (pokemons.length === 0) {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
        .then((res) => res.json())
        .then(async (data) => {
          const details = await Promise.all(
            data.results.map(async (pokemon) => {
              const res = await fetch(pokemon.url);
              const details = await res.json();
              return {
                id: details.id,
                name: details.name,
                image: details.sprites.front_default,
                height: details.height,
                weight: details.weight,
                abilities: details.abilities.map((a) => a.ability.name),
            };
            })
          );
          setPokemons(details);
          localStorage.setItem("pokemons", JSON.stringify(details));
        });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pokemons", JSON.stringify(pokemons));
  }, [pokemons]);

  const addPokemon = (name, height, weight) => {
    const newId = pokemons.length > 0 ? Math.max(...pokemons.map(pokemon => pokemon.id)) + 1 : 1; // Generate new ID
    const newPokemon = {
      id: newId,
      name,
      height,
      weight,
      image: "https://via.placeholder.com/100", // Placeholder image
      abilities: ["Unknown Ability"], // Default abilities
    };
    setPokemons([...pokemons, newPokemon]);
  };

  const updatePokemon = (id, updatedData) => {
    setPokemons(
      pokemons.map((pokemon) =>
        pokemon.id === id ? { ...pokemon, ...updatedData } : pokemon
      )
    );
  };

  const deletePokemon = (id) => {
    setPokemons(pokemons.filter((pokemon) => pokemon.id !== id));
  };

  return (
    <PokemonContext.Provider value={{ pokemons, addPokemon, updatePokemon, deletePokemon }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => useContext(PokemonContext);