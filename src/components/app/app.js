import React from "react";
//import ReactDOM from 'react-dom'

import {Route, Switch} from 'react-router-dom'
import CartPage from "../pages/cart-page";
import HomePage from "../pages/home-page";

const App = () => {
    
return(
    <Switch>
        <Route
        path='/'
        component={HomePage}
        exact
        />
        <Route
        path='/cart'
        component={CartPage}
        />
    </Switch>
)
}

// class App extends React.Component{
//   render(){console.log (this.state)
//     return <Spinner />
//   }
// }

export default App ;

