import React, { useState } from "react";
import  usePokemon  from "../pokemonContext/pokemonList2";

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
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="number" placeholder="Height" value={height} onChange={(e) => setHeight(e.target.value)} />
      <input type="number" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddPokemonForm;
