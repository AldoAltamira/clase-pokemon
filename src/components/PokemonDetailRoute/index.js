import axios from 'axios';
import {Component, useEffect, useState} from 'react';
import {useParams, withRouter} from "react-router-dom";

// function PokemonDetail() {
//   let {id} = useParams();
//   console.log('id', id);
//   const [pokemonSelected, setPokemonSelected] = useState({});
//   useEffect(() => {
//     let url = 'https://pokeapi.co/api/v2/pokemon/' + id;
//     axios.get(url).then((resp) => {
//       let newPokemonRandom = {
//         name: resp.data.name,
//         url: url,
//         img: resp.data.sprites.front_default,
//       };
//       console.log('newPokemon', newPokemonRandom);
//       setPokemonSelected(newPokemonRandom);
//     })
//     .catch((err) => {
//       console.log('listado pokemon error', err);
//     });
//   }, []);

//   return (
//     <div>
//       <img src={pokemonSelected.img} alt="pokemon"></img>
//       <p>Nombre: {pokemonSelected.name}</p>
//     </div>
//   )
// }

class PokemonDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonSelected: {}
    }
  }

  componentDidMount() {
    console.log('props', this.props);
    let {id} = this.props.match.params;
    let url = 'https://pokeapi.co/api/v2/pokemon/' + id;
      axios.get(url).then((resp) => {
        let newPokemonRandom = {
          name: resp.data.name,
          url: url,
          img: resp.data.sprites.front_default,
        };
        console.log('newPokemon', newPokemonRandom);
        this.setState({pokemonSelected: newPokemonRandom});
      })
      .catch((err) => {
        console.log('listado pokemon error', err);
      });
  }

  render() {
    let {pokemonSelected} = this.state;
    return (
      <div>
        <img src={pokemonSelected.img} alt="pokemon"></img>
        <p>Nombre: {pokemonSelected.name}</p>
      </div>
    )
  }
}

// export default PokemonDetail

export default withRouter(PokemonDetail);