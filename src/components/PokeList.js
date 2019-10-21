import React from "react";
import PropTypes from "prop-types";
import PokeCard from "./PokeCard";
import "../stylesheets/PokeList.scss";

const PokeList = props => {
  const { pokemons, filterByName } = props;

  return (
    <ul className="characteres">
      {pokemons
        .filter(myFilterName =>
          myFilterName.name.toUpperCase().includes(filterByName.toUpperCase())
        )
        .map(pokemon => {
          return (
            <li className="characteres__list" key={pokemon.id}>
              <PokeCard pokemon={pokemon} key={pokemon.id} />
            </li>
          );
        })}
    </ul>
  );
};
PokeList.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterByName: PropTypes.string.isRequired
};

export default PokeList;
