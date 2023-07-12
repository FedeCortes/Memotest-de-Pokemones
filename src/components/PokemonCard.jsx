import React, { useState } from 'react';

const PokemonCard = ({ pokemon, index, handleClick, seleccionado1,pokemonsEncontrados }) => {
  const [seleccionado, setSeleccionado] = useState(false);

  const handleCardClick = () => {
  
    handleClick(index, pokemon);
  };

  return (
    <div
      onClick={handleCardClick}
      style={{
        border: (pokemonsEncontrados && pokemonsEncontrados.some(pokemonName => pokemonName === pokemon.name)) || seleccionado1 === index ? '2px solid red' : '1px solid #000',
        backgroundColor: seleccionado1 === index ? 'red' : (pokemonsEncontrados?.includes(pokemon.name) ? 'darkgrey' : 'blue'),
        padding: '10px',
        width: '200px',
        height: '200px',
        margin: '0 auto',
      }}
    >
         <div style={{
  visibility: (pokemonsEncontrados && pokemonsEncontrados.some(pokemonName => pokemonName === pokemon.name)) || seleccionado1 === index ? 'visible' : 'hidden',
}}>
      <img
        src={pokemon.sprites.other.dream_world.front_default}
        alt="Pokemon"
        style={{ width: '100px', height: '100px' }}
      />
      <h2 style={{color:"white"}}>{pokemon.name}</h2>
      </div>
    </div>
  );
};

export default PokemonCard;