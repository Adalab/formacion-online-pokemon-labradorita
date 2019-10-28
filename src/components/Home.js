import React from "react";
import PropTypes from "prop-types";
import PokeList from "./PokeList";
import PokeFilter from "./PokeFilter";

const Home = props => {
  const { filterByName, getUserFilter, pokemons, loading } = props;
  return (
    <div className="Home">
      <PokeFilter filterByName={filterByName} getUserFilter={getUserFilter} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <PokeList pokemons={pokemons} filterByName={filterByName} />
      )}
    </div>
  );
};

Home.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterByName: PropTypes.string.isRequired,
  getUserFilter: PropTypes.func,
  loading: PropTypes.bool.isRequired
};

export default Home;
