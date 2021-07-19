import axios from 'axios';
import {Component, useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";

// Esta version de codigo es con hooks
function PokemonDetail({pokemon}) {
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
      <img style={{width: 100, height: 100}} src={pokemonSelected.img} alt="pokemon"></img>
      <p>Nombre: {pokemonSelected.name}</p>
    </div>
  )
}


// Esta version de codigo es con estados
// class PokemonDetail extends Component {
//   constructor(props) {
//     super(props);
//     // console.log('props', props);
//     this.state = {
//       pokemonSelected: props.pokemon
//     };
//   }

//   // componentDidMount() {
//   //   // console.log('props en didmount', this.props);
//   //   let keys = Object.keys(this.props.pokemon);
//   //   if (keys.length > 0) {
//   //     this.getPokemonInfo(this.props.pokemon);
//   //   }
//   // }

//   componentWillReceiveProps(nextProps) {
//     let keys = Object.keys(nextProps.pokemon);
//     let keysProps = Object.keys(this.props.pokemon);
//     if (keys.length > 0 && keys !== keysProps) {
//       console.log('infooooo');
//       this.getPokemonInfo(nextProps.pokemon);
//     }
//   }

//   getPokemonInfo(pokemon) {
//     console.log('pokemon', pokemon);
//     if (pokemon.img === '' || !pokemon.img) {
//       console.log('entro a if', pokemon.url);
//       axios.get(pokemon.url).then((resp) => {
//         console.log('datos pokemon', resp);
//         let newPokemon = pokemon;
//         newPokemon.img = resp.data.sprites.front_default;
//         newPokemon.id = resp.data.id;
//         console.log('pokemonSelected', newPokemon);
//         this.setState({pokemonSelected: newPokemon});
//       });
//     } else {
//       this.setState({pokemonSelected: pokemon});
//     }
//   }

//   render() {
//     let {pokemonSelected} = this.state;
//     let {pokemon, history} = this.props;
//     return (
//       <div onClick={() => history.push("/pokemon/" + pokemon.id)}>
//         <img style={{width: 100, height: 100}} src={pokemonSelected.img} alt="pokemon"></img>
//         <p>Nombre: {pokemonSelected.name}</p>
//       </div>
//     )
//   }
// }

// Export de hooks
export default PokemonDetail

// Export de estados
// export default withRouter(PokemonDetail)