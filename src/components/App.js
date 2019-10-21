import React from "react";
import { fetchData } from "../services/fetchData";
import Header from "./Header";
import PokeList from "./PokeList";
import PokeFilter from "./PokeFilter";

import "../stylesheets/App.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
          pokemons: info
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
    const { pokemons, filterByName } = this.state;
    return (
      <div className="app">
        <Header />
        <PokeFilter
          filterByName={filterByName}
          getUserFilter={this.getUserFilter}
        />
        <PokeList pokemons={pokemons} filterByName={filterByName} />
      </div>
    );
  }
}

export default App;
