import React from 'react';
import { useAuth, userContext } from './User';


const UserProvider = (props) => {

  const { initializing, user } = useAuth();
  if (initializing) {
    return (<div>Chargement...</div>);
  }

  const { children } = props;
  return (
    <userContext.Provider value={{user}}>
      {children}
    </userContext.Provider>
  );
}


export default UserProvider;
