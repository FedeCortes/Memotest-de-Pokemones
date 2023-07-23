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
          axios.get(`https://pokeapi.co/api/v2/pokemon/${id*5}`)
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

  const handleClick = (index, pokemon) => {
    if (pokemonSeleccionado1 === pokemon && index !== seleccionado1) {
      if (pokemonsEncontrados === null) {
        setPokemonsEncontrados([pokemon.name]);
      } else if (!pokemonsEncontrados.some(p => p === pokemon.name)) {
        setPokemonsEncontrados((prevPokemonsEncontrados) => prevPokemonsEncontrados.concat(pokemon.name));
      }
      setSeleccionado1(null);
      setPokemonSeleccionado1(null);
      verificarSiGano();
    } else {
      setSeleccionado1(index);
      setPokemonSeleccionado1(pokemon);
    }
  };

  return (
    <>
      <button
            onClick={() => {
              setPokemonsEncontrados([]);
              const shuffled = shuffledPokemonData.sort(() => Math.random() - 0.5);
              setShuffledPokemonData(shuffled);
            }}
            style={{
              
              padding: '5px 10px',
              backgroundColor: 'white',
              color: 'black',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              display:  'inline-block'
            }}
          >
            Resetear
          </button>
      <Box
        sx={{
          border: '1px solid #000',
          backgroundImage: "url('https://fondosmil.com/fondo/14767.jpg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          minHeight: '80vh',
          height:'100%',
          width:'100%'
        }}
      >
        <Grid container spacing={1}>
          {shuffledPokemonData.map((pokemon, index) => (
            <Grid item xs={4} sm={4} md={3} lg={3} key={index}>
              <div style={{ width: '100%', height: '100%' }}>
                <PokemonCard
                  pokemon={pokemon}
                  index={index}
                  handleClick={handleClick}
                  seleccionado1={seleccionado1}
                  pokemonsEncontrados={pokemonsEncontrados}
                />
              </div>

            </Grid>
          ))}
          
        </Grid>
        
          
       
      </Box>
    </>
  );
}

export default App;