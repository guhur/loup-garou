import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSession } from '../services/User';
import { useGame } from '../services/Game';
import Button from '../components/Button';


const DeadPage = () => {
  const { user } = useSession();
  const { game } = useGame();

  const gameUser = game.users.find(u => u.name === user.userName );

  return (
  <div> 
    <p>
      La partie est finie... Les gagnants sont :
    </p>
    <ul>
      { game.users.map( (user, index) => {
        if (user.isAlive) {
          return (<li>{user.userName}</li>);
        }
        else {
          return ;
        }
      })
      }
    </ul>
  </div>
  );
};

export default DeadPage;
