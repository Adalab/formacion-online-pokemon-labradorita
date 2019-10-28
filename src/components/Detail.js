import React from "react";
import "../stylesheets/Detail.scss";
import "../stylesheets/PokeFilter.scss";
import PropTypes from "prop-types";
import getEvolution from "../services/getEvolutionService";
import arrow from "../images/dot-arrow.png";
import backArrow from "../images/left-arrow.png";
import { Link } from "react-router-dom";

function changeUnits(x) {
  return x / 10;
}

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      evolutionDetails: []
    };
  }

  componentDidMount() {
    this.fetchEvolution();
  }

  fetchEvolution() {
    if (this.props.selectedPokemon) {
      const url = this.props.selectedPokemon.evolutionUrl;
      if (url !== null) {
        getEvolution(url).then(data => {
          const evolutionPokemons = [data.chain.species.name];
          let evo2 = null;
          let evo1 = null;

          if (data.chain.evolves_to && data.chain.evolves_to.length > 0) {
            evo1 = data.chain.evolves_to[0].species.name;

            if (
              data.chain.evolves_to[0].evolves_to &&
              data.chain.evolves_to[0].evolves_to.length > 0
            ) {
              evo2 = data.chain.evolves_to[0].evolves_to[0].species.name;
            }
          }

          if (evo1 !== null) {
            evolutionPokemons.push(evo1);
          }
          if (evo2 !== null) {
            evolutionPokemons.push(evo2);
          }

          this.setState({
            evolutionDetails: evolutionPokemons
          });
        });
      }
    } else {
      return <p>Loading...</p>;
    }
  }

  render() {
    const { selectedPokemon } = this.props;
    const { evolutionDetails } = this.state;
    let pokeAbilities = "";
    if (selectedPokemon) {
      selectedPokemon.abilities.map(item => {
        return (pokeAbilities += `${item.ability.name}, `);
      });
    } else {
      return <p>Loading...</p>;
    }

    return (
      <React.Fragment>
        {selectedPokemon && evolutionDetails ? (
          <div className="PokemonPage">
            <div className="Detail__container">
              <div className="Detail__name">
                <h2>{selectedPokemon.name}</h2>
              </div>
              <div className="Detail__mainInfo">
                <img
                  className="Detail__image"
                  src={selectedPokemon.sprites.front_default}
                  alt={selectedPokemon.name}
                />

                <div className="Detail__types">
                  <ul>
                    {selectedPokemon.types.map(item => {
                      return (
                        <li className="Detail__types-type" key={item.type.name}>
                          {item.type.name.toUpperCase()}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="Detail__info">
                <h1>Información</h1>
              </div>
              <div className="Detail__profile">
                <p>{`Altura: ${changeUnits(selectedPokemon.height)} m`}</p>
                <p>{`Peso: ${changeUnits(selectedPokemon.weight)} kg`}</p>
                <p>
                  {`Habilidades: ${pokeAbilities.substring(
                    0,
                    pokeAbilities.length - 2
                  )}`}
                </p>
              </div>
              <div className="Detail__evolutions">
                <h1>Evolución</h1>
              </div>
              <div className="Detail__evolution">
                <p>{evolutionDetails[0]}</p>
                <img className="arrow" src={arrow} alt="flecha" />
                <p>{evolutionDetails[1]}</p>
                {evolutionDetails[2] ? (
                  <React.Fragment>
                    <img className="arrow" src={arrow} alt="flecha" />
                    <p>{evolutionDetails[2]}</p>
                  </React.Fragment>
                ) : (
                  ""
                )}
              </div>
            </div>
            <Link to="/">
              <img className="backArrow" src={backArrow} alt="Volver" />
            </Link>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </React.Fragment>
    );
  }
}

Detail.propTypes = {
  selectedPokemon: PropTypes.object
};

export default Detail;
