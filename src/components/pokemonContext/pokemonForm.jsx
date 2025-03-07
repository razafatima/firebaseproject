import React, { useState } from "react";
import { usePokemon } from "../pokemonContext/pokemonContext";
import styles from '../styles/style.module.css';

const AddPokemonForm = () => {
  const { addPokemon } = usePokemon();
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !height || !weight) return;
    addPokemon(name, height, weight);
    setName("");
    setHeight("");
    setWeight("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Height" value={height} onChange={(e) => setHeight(e.target.value)} required />
      <input type="number" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} required />
      <button type="submit" className={styles.button}>Add Pokemon</button>
    </form>
  );
};

export default AddPokemonForm;