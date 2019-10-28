import React from "react";
import { fetchData } from "../services/fetchData";
import Header from "./Header";
import Home from "./Home";
import Detail from "./Detail";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "../stylesheets/App.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      pokemons: [],
      filterByName: ""
    };
    this.getUserFilter = this.getUserFilter.bind(this);
  }

  componentDidMount() {
    this.getPokemons();
  }

  getPokemons() {
    fetchData()
      .then(data => {
        const pokeArr = data.results.map(item => {
          return fetch(item.url).then(response => response.json());
        });
        return Promise.all(pokeArr);
      })
      .then(info => {
        this.setState({
          pokemons: info,
          loading: false
        });
      });
  }

  getUserFilter(ev) {
    const userInput = ev.currentTarget.value;
    this.setState({
      filterByName: userInput
    });
  }

  render() {
    console.log(this.state.pokemons);
    // destructuring
    const { pokemons, filterByName, loading } = this.state;
    return (
      <BrowserRouter>
        <div className="app">
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  pokemons={pokemons}
                  filterByName={filterByName}
                  getUserFilter={this.getUserFilter}
                  loading={loading}
                />
              )}
            />
            <Route
              path="/pokemon/:pokemonId"
              render={routerProps => {
                return (
                  <Detail
                    selectedPokemon={pokemons.find(
                      item =>
                        item.id === parseInt(routerProps.match.params.pokemonId)
                    )}
                    pokemons={pokemons}
                  />
                );
              }}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
