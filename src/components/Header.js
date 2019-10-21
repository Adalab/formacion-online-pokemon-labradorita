import React from "react";
import pokeLogo from "../images/pokemonLogo.png";
import "../stylesheets/Header.scss";

const Header = () => {
  return (
    <header className="header">
      <img src={pokeLogo} alt="logo pokemons" className="header__img"></img>
    </header>
  );
};

export default Header;
