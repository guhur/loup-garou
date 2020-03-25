# Utilisation des contextes en React avec l'API Hooks

Plutôt que d'utiliser les classes, React vous propose d'utilise des fonctions, lesquelles sont nettement moins longues à écrire -- et donc sont plus simples à maintenir.
La différence entre les deux est illustrée [ici](https://codepen.io/guhur/pen/RwPeXZO): 

```jsx
const Button1 = (props) => {
  const { onClick, children } = props; 
  return (<button onClick={onClick}>{children}</button>);
}
  
class Button2 extends React.Component {
  render() {
    const {children, onClick} = this.props;
    // équivalent à :
    // const onClick = props.onClick;
    // const children = props.children
    return(
      <button onClick={onClick}> 
        { children }
      </button>
    );
  }
} 
```

De la même manière qu'avec les [classes](./context_react.md), on définit un contexte et un Provider :

```jsx
const counterContext = React.createContext({counter: 0});

class CounterProvider extends React.Component {
  state = {
     counter: 0,
     increment: () => this.setState({counter: this.state.counter + 1})
  }
  render() {
    return(
            <counterContext.Provider value={this.state}>
                {this.props.children}
            </counterContext.Provider>
        )
  } 
}
```

## Remplacer le HOC par `useContext`

Le provider partage des données à l'ensemble de l'application. Mais comment peut-on souscrire à ces données ?
Plutôt que de définir un HOC, nous allons utiliser la fonction `useContext` pour consommer les données partagées par un contexte :

```jsx
const useCounter = () => {
  const {counter, increment} = useContext(counterContext);
  return {counter, increment};
};
```

Pour utiliser le compteur :
```jsx
const Button = (props) => {
  const {counter, increment} = useCounter();
  return (<button onClick={increment}>Incrémenter ({counter})</button>);
}
```

La demo est disponible sur [codepen](https://codepen.io/guhur/pen/ZEGmzam).

Que se passe-t-il étape par étape ?

1. Lorsqu'on clique sur le bouton, on fait appel à `increment`.
2. `increment` a été injecté dans le composant grâce à `useCounter`.
3. `useCounter` est juste une ré-écriture des données stockées dans le `counterContext`
4. `increment` est donc toujours la fonction `this.state.increment` définit dans `CounterProvider`.
5. De même qu'avec les classes, `this.state.increment` fait appel à `this.setState`, qui fait ensuite appel à `render`.
6. `render` reconstruit `Button`
7. `Button` affiche la nouvelle valeur du compteur.


## Ré-écrire le `Provider` avec `useState`

On peut également remplacer la méthode `this.setState` du Provider avec la nouvelle Hooks API de React : 

```jsx
const CounterProvider = (props) => {
  // 0 est la valeur par défaut du compteur
  // setCounter est équivalent à l'ancienne méthode `this.setState` :
  
  const [counter, setCounter] = useState(0);
  const increment = () => setCounter(counter + 1);
  
  return(
    <counterContext.Provider value={{counter, increment}}>
      {props.children}
    </counterContext.Provider>
  )
}
```

La demo est disponible sur [codepen](https://codepen.io/guhur/pen/gOpQYKW).

