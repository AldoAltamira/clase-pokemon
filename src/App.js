import React from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';
import NotFound from './components/NotFound';
import Home from './components/Home';
import PokemonDetailRoute from './components/PokemonDetailRoute';

// Esta version de codigo es con hooks
// function App() {
//   return (
//     <Switch>
//       <Route path="/home" component={Home} />
//       <Route path="/pokemon/:id" component={PokemonDetailRoute} />
//       <Redirect to="/home" />
//       <Route component={NotFound} />
//     </Switch>
//   );
// }

// Esta version de codigo es con estado
class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/pokemon/:id" component={PokemonDetailRoute} />
        <Redirect to="/home" />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default App;
