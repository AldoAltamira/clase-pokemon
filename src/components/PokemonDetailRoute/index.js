import axios from 'axios';
import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

function PokemonDetail() {
  let {id} = useParams();
  console.log('id', id);
  const [pokemonSelected, setPokemonSelected] = useState({});
  useEffect(() => {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + id;
    axios.get(url).then((resp) => {
      let newPokemonRandom = {
        name: resp.data.name,
        url: url,
        img: resp.data.sprites.front_default,
      };
      console.log('newPokemon', newPokemonRandom);
      setPokemonSelected(newPokemonRandom);
    })
    .catch((err) => {
      console.log('listado pokemon error', err);
    });
  }, []);

  return (
    <div>
      <img src={pokemonSelected.img} alt="pokemon"></img>
      <p>Nombre: {pokemonSelected.name}</p>
    </div>
  )
}

export default PokemonDetail