import React, { useEffect, useState } from 'react';
import { getBoards } from './services/api';

function App() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    getBoards(token).then(setBoards).catch(console.error);
  }, []);

  return (
    <div>
      <h1>Your Boards</h1>
      {boards.map(board => (
        <div key={board.id}>
          <h2>{board.title}</h2>
          {board.lists.map(list => (
            <div key={list.id}>
              <h3>{list.title}</h3>
              <ul>
                {list.cards.map(card => (
                  <li key={card.id}>{card.title}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;