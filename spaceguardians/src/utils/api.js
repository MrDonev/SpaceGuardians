import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
  headers: {
    'X-RapidAPI-Key': '4b8a5c1716msh90be831e8f5647bp165509jsn8aaaa62c5f1f',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
  },
};

export const getGames = () => {
  return axios
    .request(options)
    .then((response) => {
     return response.data
    })
    .catch((error) => {
      console.error(error);
    });
};
