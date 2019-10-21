import React from "react";
import PropTypes from "prop-types";
import "../stylesheets/PokeCard.scss";

class PokeCard extends React.Component {
  render() {
    const { pokemon } = this.props;

    return (
      <div className="card">
        <div className="card__container">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="card__image"
          ></img>
          <p className="card__id">ID/{pokemon.id}</p>
        </div>

        <div className="card-bottom">
          <h2 className="card-bottom__name">{pokemon.name}</h2>
          <div className="card-bottom__typesContainer">
            <ul className="card-bottom__typesList">
              {pokemon.types.map((type, index) => {
                return (
                  <li className="card-bottom__typesItem" key={index}>
                    {type.type.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

PokeCard.propTypes = {
  pokemon: PropTypes.object.isRequired
};

export default PokeCard;
