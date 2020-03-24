import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSession } from '../services/User';
import { useGame } from '../services/Game';
import Button from '../components/Button';


const NightPage = () => {
  const { game } = useGame();

  return (
  <div> 
    <p>
      C'est la nuit...
      TODO add actions.
    </p>
  </div>
  );
};

export default NightPage;



