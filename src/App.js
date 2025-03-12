import React from "react";
import { PokemonProvider } from "../src/components/pokemonContext/pokemonContext";
import PokemonList from "../src/components/pokemonContext/pokemonList2";
// import PokemonForm from '../src/components/pokemonContext/pokemonForm';
import Login from '../src/components/login/login';
import DemoPage from '../src/components/login/demopage';
import Signup from '../src/components/signup/signup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <PokemonProvider>
    <Router>

      <Routes>
          {/* Default Page: Login Page */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/pokemonlist2" element={<PokemonList />} />
        </Routes>

    </Router>
  </PokemonProvider>
  );
}

export default App;
