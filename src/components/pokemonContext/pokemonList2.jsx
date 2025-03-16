import React, { useState } from "react";
import { usePokemon } from "../pokemonContext/pokemonContext";
import AddPokemonForm from "../pokemonContext/pokemonForm";
import styles from '../styles/style.module.css';

const PokemonTable = () => {
  const { pokemons, deletePokemon, updatePokemon } = usePokemon();
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <AddPokemonForm /> 
      <div className={styles.tablecontainer}>
      <table className={styles.pokemontable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Height</th>
            <th>Weight</th>
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
              {/* <td>{pokemon.abilities}</td> */}
              <td>
                {editId === pokemon.id ? (
                  <button onClick={() => { updatePokemon(pokemon.id, editData); setEditId(null); }} >Save</button>
                ) : (
                  <button onClick={() => { setEditId(pokemon.id); setEditData(pokemon); }} className={styles.btns}>Edit</button>
                )}
                <button onClick={() => deletePokemon(pokemon.id)} className={styles.btn}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default PokemonTable;