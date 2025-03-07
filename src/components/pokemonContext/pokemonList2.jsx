import React, { useState } from "react";
import { usePokemon } from "../pokemonContext/pokemonContext";

const PokemonTable = () => {
  const { pokemons, deletePokemon, updatePokemon } = usePokemon();
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  return (
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Image</th>
          <th>Height</th>
          <th>Weight</th>
          <th>Abilities</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {pokemons.map((pokemon) => (
          <tr key={pokemon.id}>
            <td>{pokemon.id}</td>
            <td>
              {editId === pokemon.id ? (
                <input
                  type="text"
                  name="name"
                  value={editData.name || pokemon.name}
                  onChange={handleEditChange}
                />
              ) : (
                pokemon.name
              )}
            </td>
            <td>
              <img src={pokemon.image} alt={pokemon.name} width="50" />
            </td>
            <td>
              {editId === pokemon.id ? (
                <input
                  type="number"
                  name="height"
                  value={editData.height || pokemon.height}
                  onChange={handleEditChange}
                />
              ) : (
                pokemon.height
              )}
            </td>
            <td>
              {editId === pokemon.id ? (
                <input
                  type="number"
                  name="weight"
                  value={editData.weight || pokemon.weight}
                  onChange={handleEditChange}
                />
              ) : (
                pokemon.weight
              )}
            </td>
            <td>{pokemon.abilities}</td>
            <td>
              {editId === pokemon.id ? (
                <button onClick={() => { updatePokemon(pokemon.id, editData); setEditId(null); }}>Save</button>
              ) : (
                <button onClick={() => { setEditId(pokemon.id); setEditData(pokemon); }}>Edit</button>
              )}
              <button onClick={() => deletePokemon(pokemon.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PokemonTable;
