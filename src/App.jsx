import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PokemonCard from './components/PokemonCard';
import Swal from 'sweetalert2';

function App() {

  const [pokemonIds, setPokemonIds] = useState([1, 2, 3, 4, 5, 6]);
  const [seleccionado1, setSeleccionado1] = useState(null);
  const [pokemonSeleccionado1, setPokemonSeleccionado1] = useState(null);
  const [pokemonsEncontrados, setPokemonsEncontrados] = useState([]);
  const [shuffledPokemonData, setShuffledPokemonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = pokemonIds.map((id) =>
          axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        );

        const responses = await Promise.all(requests);
        const pokemonInfo = responses.map((response) => response.data);
        
        const duplicatedPokemonData = [...pokemonInfo, ...pokemonInfo];

        setShuffledPokemonData(duplicatedPokemonData.sort(() => Math.random() - 0.5));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [pokemonIds]);

  const handleInputChange = useCallback((e, index) => {
    const inputNumber = parseInt(e.target.value);
    const updatedPokemonIds = [...pokemonIds];
    updatedPokemonIds[index] = inputNumber;
    setPokemonIds(updatedPokemonIds);
  }, [pokemonIds]);

  


  const mostrarMensajeGanador = () => {
    Swal.fire({
      title: '¡Ganaste!',
      text: 'Has encontrado todos los Pokémon. ¡Felicidades!',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  };

  const verificarSiGano = () => {
  if (pokemonsEncontrados.length === 5) {
    mostrarMensajeGanador();
  }
};

  const handleClick = (index,pokemon) => {
    if(pokemonSeleccionado1==pokemon && index != seleccionado1){
      
      if(pokemonsEncontrados==null){
        setPokemonsEncontrados(pokemon.name);
      }else if(!pokemonsEncontrados.some(p => p === pokemon.name)){
        
      setPokemonsEncontrados((prevPokemonsEncontrados) => prevPokemonsEncontrados.concat(pokemon.name));
      }
      setSeleccionado1(null);
      setPokemonSeleccionado1(null);
      
    verificarSiGano();  
    }else{
      
    setSeleccionado1(index);
    setPokemonSeleccionado1(pokemon)
    }
  };

  return (
    <>
      <h2>Memotest con pokemones</h2>
      <p>Pone a prueba tu memoria</p>
      <Box
        sx={{
          border: '1px solid #000',
          backgroundImage:"url('https://fondosmil.com/fondo/14767.jpg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          padding: '20px',
          display: 'flex',
          justifyContent: 'center', // Centra horizontalmente los elementos
          minHeight: '80vh', // Ajusta la altura para centrar verticalmente en la página
        }}
      >
         <Grid container spacing={2}>
    {shuffledPokemonData.map((pokemon, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        <PokemonCard
          pokemon={pokemon}
          index={index}
          handleClick={handleClick}
          seleccionado1={seleccionado1}
          pokemonsEncontrados={pokemonsEncontrados}
        />
      </Grid>
    ))}
  </Grid>
  <button onClick={() => {
    setPokemonsEncontrados([]) 
    const shuffled = shuffledPokemonData.sort(() => Math.random() - 0.5);
    setShuffledPokemonData(shuffled) }}
    >
  R <br/>
  e <br/>
  s <br/>
  e <br/>
  t <br/>
  e <br/>
  a <br/>
  r
</button>
      </Box>

     
     
    </>
  );
}

export default App;