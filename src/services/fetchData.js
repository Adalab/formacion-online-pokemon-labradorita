const URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=25";

const fetchData = () => {
  return fetch(URL).then(response => response.json());
};

export { fetchData };
