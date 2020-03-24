import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSession } from '../services/User';
import Button from '../components/Button';


const CastPage = (props) => {
  const { user } = useSession();
  const { history } = useHistory();
  
  if (!user.isAlive) {
    history.push("/wait");
    
  }

  return (<div>
    <ul>
    {
    }
    </ul>
    </div>);
}

export default CastPage;
