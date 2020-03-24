import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSession } from '../services/User';
import { useGame } from '../services/Game';
import Button from '../components/Button';


const ResultsPage = () => {
  const { game } = useGame();

  if (game.phase !== "vote") {
    return <div>Oops... La phase est {game.phase}</div>;
  }

  const isFinished = true;
  game.users.forEach( 
    (user) => {
      if (user.vote === "" && user.isAlive) {
        isFinished = false;
      }
    }
  )

  if (!isFinished) {
    return <div>En attente de tous les joueurs</div>;
  }

  // TODO add results 
  return (
  <div> 
    C'est [...] qui est mort !
  </div>
  );
};

export default ResultsPage;
