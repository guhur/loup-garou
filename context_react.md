# Le contexte avec React

[Demo Live](https://codepen.io/guhur/pen/dyogxyK)


L'objectif de partager des données à une partie de l'application. 
Lorsque ces données changent, les composants qui se sont inscrits à ces données sont mis à jour. 

On définit un contexte avec : 
```jsx
const myContext = React.createContext(valeur_par_defaut);
```

ensuite, on définit un `Provider` qui réagit au changement d'une donnée:

```jsx
<myContext.Provider value={my_data}>
     { 
// ici on place les composants qui ont besoin d'accéder à my_data
   }
 </myContext.Provider>
```

Le `Provider` doit donc être rechargé à chaque fois que `my_data` à changer.

En utilisant des classes, le rechargement s'opère grâce à la fonction `setState` en plaçant le `Provider` dans une classe composant React :

```jsx
class MyProvider extends React.Component {
  state = {
     counter: 0,
     increment: () => this.setState({counter: this.state.counter + 1})
  }
  render() {
    return(
            <myContext.Provider value={this.state}>
                {this.props.children}
            </myContext.Provider>
        )
  } 
}
```

De l'autre côté, pour qu'un enfant puisse accéder à `my_data`, on injecte `my_data` dans un HOC (higher order component) :

```jsx
const Button = (props) => <button onClick={props.increment}>Incrémenter le compteur ({props.counter})
</button>;
const withCounter = Component => {
    const NewComponent = props => {
        return(
            <myContext.Consumer>
                { value => <Component {... value} {... props}/>}
            </myContext.Consumer>
        )
    }
    return NewComponent
}
const ButtonWithCounter = withCounter(Button);
```

Ainsi, si un enfant appelle la fonction `increment` , il appelle le `setState` de `MyProvider`, qui appelle `render`, lequel re-génère cet enfant. Il suffit donc de placer ButtonWithCounter comme un enfant de MyProvider: 

```jsx
const App = () => <MyProvider><ButtonWithCounter /></MyProvider>;
```

Le HOC est une fonction compliquée, mais il suffit de retenir qu'il ajoute un attribut (une `props`) qui contient `my_data`.

Si on récapitule le fonctionnement :

1. Lorsqu'on clique sur le bouton, on fait appel à `props.increment`.
2. `props.increment` a été injecté dans le composant grâce au HOC `withCounter`.
3. Il s'agit en fait la valeur donnée par `this.state.increment` définit dans `MyProvider`.
4. `this.state.increment` fait appel à `this.setState`.
5. `this.setState` fait ensuite appel à `render`.
6. `render` reconstruit `ButtonWithCounter`
7. `ButtonWithCounter` affiche la nouvelle valeur du compteur
