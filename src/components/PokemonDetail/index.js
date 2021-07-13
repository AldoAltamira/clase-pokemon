import axios from 'axios';
import {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";

function PokemonDetail({pokemon}) {
  console.log('props en pokemonDetail', pokemon);
  let history = useHistory();
  const [pokemonSelected, setPokemonSelected] = useState(pokemon);
  useEffect(() => {
    if (pokemon.img === '' || !pokemon.img) {
      axios.get(pokemon.url).then((resp) => {
        console.log('datos pokemon', resp);
        let newPokemon = pokemon;
        newPokemon.img = resp.data.sprites.front_default;
        newPokemon.id = resp.data.id;
        setPokemonSelected(newPokemon);
      });
    } else {
      setPokemonSelected(pokemon);
    }
  }, [pokemon]);

  return (
    <div onClick={() => history.push("/pokemon/" + pokemon.id)}>
      <img src={pokemonSelected.img} alt="pokemon"></img>
      <p>Nombre: {pokemonSelected.name}</p>
    </div>
  )
}

export default PokemonDetail