import React from 'react';
import { useSession } from '../services/User';


const AlivePage = (props) => {
  const { user } = useSession();
  return (<h1>Vous êtes {user.persona}</h1>);
}

export default AlivePage;
