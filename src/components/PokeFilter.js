import React from "react";
import PropTypes from "prop-types";
import "../stylesheets/PokeFilter.scss";

const PokeFilter = props => {
  const { getUserFilter, filterByName } = props;

  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        value={filterByName}
        onChange={getUserFilter}
        name="search"
        id="search"
        placeholder="Escribe el nombre del pokemon"
      ></input>
    </div>
  );
};

PokeFilter.propTypes = {
  filterByName: PropTypes.string,
  getUserFilter: PropTypes.func
};

export default PokeFilter;
