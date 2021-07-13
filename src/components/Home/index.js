import {useEffect, useState} from 'react';
import axios from 'axios';
import '../../App.css';
import PokemonDetail from '../PokemonDetail';
import {Button} from '@material-ui/core';
import { useHistory } from "react-router-dom";

function Home() {
  const [pokemon, setPokemon] = useState({});
  let numeroRandom = parseInt(Math.random() * 19);
  const [listadoPokemon, setListadoPokemon] = useState([]);
  const [random, setRandom] = useState(numeroRandom);
  let history = useHistory();

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon').then((resp) => {
      let listado = resp.data.results;
      setListadoPokemon(listado);
      let newPokemon = listado[numeroRandom];
      console.log('newPokemon', newPokemon);
      setPokemon(newPokemon);
    })
    .catch((err) => {
      console.log('listado pokemon error', err);
    });
  }, []);

  const getRandomPokemon = () => {
    let nuevoRandom = parseInt(Math.random() * 800);
    let url = 'https://pokeapi.co/api/v2/pokemon/' + nuevoRandom;
    axios.get(url).then((resp) => {
      let newPokemonRandom = {
        name: resp.data.name,
        url: url,
        img: resp.data.sprites.front_default,
        id: resp.data.id,
      };
      console.log('newPokemon', newPokemonRandom);
      setPokemon(newPokemonRandom);
    })
    .catch((err) => {
      console.log('listado pokemon error', err);
    });
  };

  return (
    <div className="App">
      <p>Pokemon {random}</p>
      <PokemonDetail pokemon={pokemon} />
      <Button variant="contained" color="primary" onClick={() => getRandomPokemon()}>Pokemon Random</Button>

      {listadoPokemon.map((e,i) => (
        <Button key={i} variant="contained" color="primary" onClick={() => {
          // PARA REDIRIGIR USAR ESTO
          history.push("/pokemon/" + e.name);
          // PARA CAMBIAR USAr
          // setPokemon(e);
        }}>{e.name}</Button>
      ))}
    </div>
  );
}

export default Home;
