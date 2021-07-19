import {Component, useEffect, useState} from 'react';
import axios from 'axios';
import '../../App.css';
import PokemonDetail from '../PokemonDetail';
import {Button, Input, InputAdornment, IconButton, Slider} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from "react-router-dom";

// Esta version de codigo es con hooks
// function Home() {
//   let numeroRandom = parseInt(Math.random() * 19);
//   const [pokemon, setPokemon] = useState({});
//   const [search, setSearch] = useState('');
//   const [listadoPokemon, setListadoPokemon] = useState([]);
//   const [rango, setRango] = useState([0, 20]);
//   const [random, setRandom] = useState(numeroRandom);
//   let history = useHistory();

//   useEffect(() => {
//     obtenerListado();
//   }, []);

//   const obtenerListado = () => {
//     let url = `https://pokeapi.co/api/v2/pokemon?offset=${rango[0]}&limit=${rango[1]}`
//     axios.get(url).then((resp) => {
//       let listado = resp.data.results.map((e, i) => {
//         e.id = i;
//         return e;
//       });
//       setListadoPokemon(listado);
//       let idRandom = 0;
//       if (random <= resp.data.results.length) {
//         idRandom = random;
//       }
//       let newPokemon = listado[idRandom];
//       console.log('newPokemon', newPokemon);
//       setPokemon(newPokemon);
//       console.log('numeroRandom', pokemon);
//     })
//     .catch((err) => {
//       console.log('listado pokemon error', err);
//     });
//   }

//   const getRandomPokemon = (nuevoId) => {
//     let url = 'https://pokeapi.co/api/v2/pokemon/' + nuevoId.toString().toLowerCase();
//     axios.get(url).then((resp) => {
//       let newPokemonRandom = {
//         name: resp.data.name,
//         url: url,
//         img: resp.data.sprites.front_default,
//         id: resp.data.id,
//       };
//       setPokemon(newPokemonRandom);
//     })
//     .catch((err) => {
//       console.log('listado pokemon error', err);
//       alert(`El pokemon ${nuevoId} no existe`);
//     });
//   };

//   const columnas = [
//     {
//       field: 'id',
//       headerName: 'Id',
//     },
//     {
//       field: 'name',
//       headerName: 'Nombre',
//     }
//   ]

//   return (
//     <header className="App-header">
//       <div className="App">
//         <p>Pokemon {random}</p>
//         <PokemonDetail pokemon={pokemon} />
//         <br />
//         <Input
//           value={search}
//           label='Hola'
//           variant="filled"
//           style={{color: 'white'}}
//           color='secondary'
//           onChange={(ev) => setSearch(ev.target.value)}
//           endAdornment={
//             <InputAdornment position="end">
//               <IconButton onClick={() => getRandomPokemon(search)}>
//                 <SearchIcon />
//               </IconButton>
//             </InputAdornment>
//           }
//         />
//         <br />
//         <br />
//         <Button variant="contained" color="primary" onClick={() => getRandomPokemon(parseInt(Math.random() * 800))}>Pokemon Random</Button>
//         <br />
//         <br />
//         <div style={{margin: 16, marginLeft: 40, marginRight: 40}}>
//           <Slider max={800} value={rango} valueLabelDisplay="on" onChange={(event, newValue) => {
//             setRango(newValue);
//           }} />
//           <Button variant="contained" color="primary" onClick={() => obtenerListado()}>Buscar</Button>
//         </div>
//         <br /> 
//         <br /> 
//         <div style={{ height: 400, width: '100%' }}>
//           <DataGrid rows={listadoPokemon} columns={columnas} pageSize={5} />
//         </div>
//         {listadoPokemon.map((e,i) => (
//           <Button key={i} variant="contained" color="primary" onClick={() => {
//             // PARA REDIRIGIR USAR ESTO
//             // history.push("/pokemon/" + e.name);
//             // PARA CAMBIAR USAr
//             setPokemon(e);
//           }}>{e.name}</Button>
//         ))}
//       </div>
//     </header>
//   );
// }


// Esta version de codigo es con estados
const numeroRandom = parseInt(Math.random() * 19);
const columnas = [
  {
    field: 'id',
    headerName: 'Id',
  },
  {
    field: 'name',
    headerName: 'Nombre',
  }
]
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: {},
      search: '',
      listadoPokemon: [],
      rango: [0,20],
      random: numeroRandom,
    };
  }

  componentDidMount() {
    this.obtenerListado();
  }

  obtenerListado = () => {
    let {rango, random} = this.state;
    let url = `https://pokeapi.co/api/v2/pokemon?offset=${rango[0]}&limit=${rango[1]}`
    axios.get(url).then((resp) => {
      let listado = resp.data.results.map((e, i) => {
        e.id = i;
        return e;
      });
      let idRandom = 0;
      if (random <= resp.data.results.length) {
        idRandom = random;
      }
      let newPokemon = listado[idRandom];
      console.log('newPokemon', newPokemon);
      this.setState({listadoPokemon: listado, pokemon: newPokemon});
      
    })
    .catch((err) => {
      console.log('listado pokemon error', err);
    });
  }

    getRandomPokemon = (nuevoId) => {
      let url = 'https://pokeapi.co/api/v2/pokemon/' + nuevoId.toString().toLowerCase();
      axios.get(url).then((resp) => {
        let newPokemonRandom = {
          name: resp.data.name,
          url: url,
          img: resp.data.sprites.front_default,
          id: resp.data.id,
        };
        this.setState({pokemon: newPokemonRandom});
      })
      .catch((err) => {
        console.log('listado pokemon error', err);
        alert(`El pokemon ${nuevoId} no existe`);
      });
    };

  render() {
    let {random, pokemon, search, listadoPokemon, rango} = this.state;
    return (
      <header className="App-header">
        <div className="App">
          <p>Pokemon {random}</p>
          <PokemonDetail pokemon={pokemon} />
          <br />
          <Input
            value={search}
            label='Hola'
            variant="filled"
            style={{color: 'white'}}
            color='secondary'
            onChange={(ev) => this.setState({search: ev.target.value})}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => this.getRandomPokemon(search)}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
          <br />
          <br />
          <Button variant="contained" color="primary" onClick={() => this.getRandomPokemon(parseInt(Math.random() * 800))}>Pokemon Random</Button>
          <br />
          <br />
          <div style={{margin: 16, marginLeft: 40, marginRight: 40}}>
            <Slider max={800} value={rango} valueLabelDisplay="on" onChange={(event, newValue) => {
              this.setState({rango: newValue})
            }} />
            <Button variant="contained" color="primary" onClick={() => this.obtenerListado()}>Buscar</Button>
          </div>
          <br /> 
          <br /> 
          {/* <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={listadoPokemon} columns={columnas} pageSize={5} />
          </div> */}
          {listadoPokemon.map((e,i) => (
            <Button key={i} variant="contained" color="primary" onClick={() => {
              // PARA REDIRIGIR USAR ESTO
              // history.push("/pokemon/" + e.name);
              // PARA CAMBIAR USAr
              this.setState({pokemon: e})
            }}>{e.name}</Button>
          ))}
        </div>
      </header>
    );
  }
}

export default Home;
