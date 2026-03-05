import { Suspense } from "react";
import { fetchData } from "./fetchData";

import "./App.css";
const apiData = fetchData("http://127.0.0.1:8000/api/games"); // Llama a la función fetchData para obtener los datos de la URL especificada

function App() {
  const data = apiData.read(); // Lee los datos obtenidos de la función fetchData

  return (
    <div className="App">
      <h1>Video Games</h1>
      <Suspense fallback={<h2>Loading...</h2>}>
        <ul className="game-list">
          {data.map((game) => (
            <li key={game.id} className="card-games">
              <img src={game.image_path} alt={game.name} />
              <h3>{game.name}</h3>
              <p>{game.description}</p>
              <ul>
                <li>Developer: {game.developer}</li>
                <li>Release year: {game.release_year}</li>
                <li>Genre: {game.genre}</li>
                <li>Graphics style: {game.graphics_style}</li>
              </ul>
              <a
                href={game.steam_url}
                rel="noopener noreferrer"
                className="details-steam"
                target="_blank"
              >
                View Details
              </a>
            </li>
          ))}
        </ul>
      </Suspense>
    </div>
  );
}

export default App;
