import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSession } from '../services/User';
import Button from '../components/Button';


const CastPage = (props) => {
  const { user } = useSession();
  const { history } = useHistory();
  
  if (user.persona !== "wizard") {
    history.push("/wait");
    
  }
  return (<div>
    <Button>Tuer un joueur TODO only once</Button>
    <Button>Ressusciter TODO add name</Button>
    <Link to="/wait">
      <Button>Ne rien faire</Button>
    </Link>
    </div>);
}

export default CastPage;
